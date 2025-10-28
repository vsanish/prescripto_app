import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { json } from 'express';
import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'


//API to register user
const registerUser = async(req,res) =>{

    try {

        const{ name, email, password} = req.body;

        if(!name || ! email || !password){
            return res.json({success:false,message:"Missing details"})
        }

        //validating user email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"})
        }

        //validating user password
        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt)


        const userData = {
            name,
            email,
            password:hashpassword
        }

        const newUser = new userModel(userData);
        const user   =  await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})
            
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message});
        
    }
}


//API for user login
const loginUser = async(req,res)=>{

    try {
        const {email,password} = req.body;
        const user  = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exit"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}


//Api to get the user profile data
const getProfile = async(req,res)=>{

    try {
        // const userId = req.body.id;
        const userId = req.user?._id || req.user?.id;
        const userData  = await userModel.findById(userId).select('-password');

        if (!userData) {
        return res.json({ success: false, message: "User not found" });
        }

        res.json({success:true, userData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Api to update user profile 
const updateProfile = async(req,res)=>{

    try {
        
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        // const userId = req.body.userId;
        const userId = req.user.id;

        if(!name || !phone || !dob || !gender){
            return res.json({success:false, message:"Data Missing"})
        }

        
        
        // const parsedAddress = address ? JSON.parse(address) : {};
        // //JSON.parse(address)

        let parsedAddress = {};
        if(address){
            if(typeof address === 'string'){
                parsedAddress = JSON.parse(address);
            } else if(typeof address === 'object'){
                parsedAddress = address;
            }
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:parsedAddress,dob,gender});

        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        res.json({success:true,message:"Profile Updated"});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//ApI to book Appointment
const bookAppointment = async(req,res)=>{
    try {
        const userId = req.user.id;
        const { docId, slotDate, slotTime} = req.body;

        if (!docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const docData  = await doctorModel.findById(docId).select('-password')

        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({success:false,message:"Doctor not Available"})
        }

        // let slots_booked = docData.slots_booked
        const slots_booked = docData.slots_booked || {};

    //checks for slot availability
    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false, message:"Slots not available"})
        }else{
            slots_booked[slotDate].push(slotTime)
        }
    }else{
        slots_booked[slotDate]= []
        slots_booked[slotDate].push(slotTime)
    }
        
    const userData = await userModel.findById(userId).select('-password')
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    delete docData.slots_booked;
    // const docDataObj = docData.toObject();
    // delete docDataObj.slots_booked;

    const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount: docData.fees,
        slotTime,
        slotDate,
        date: Date.now(),
    };
    
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    //save new slots data in docdata
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true, message:"Appointment Booked successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}  

//API to get user appointments for frontend my-appointments page
const listAppointment = async (req,res) =>{
    try {
        
        // const {userId} = req.body;
        const userId = req.user?.id;
        const appointments = await appointmentModel.find({userId})

        res.json({success:true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for Cancel Appointments
const cancelAppointment = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if(appointmentData.userId.toString() !== userId ){
            return res.json({success:false,message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing Doctors slot

        const {docId,slotDate,slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] =slots_booked[slotDate].filter(e => e !== slotTime)

        // persist the updated slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        
        res.json({success:true, message:"Appointment Cancelled"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// const razorpayInstance = new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET,
// })

//API for making payment of appointment using razorpay
const paymentRazorpay = async (req,res) =>{

    try {

        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({success:false, message:"Appointment cancelled or not found"})
        }
        
            //creating option for making razorpayment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt:appointmentId
        }

        //creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({success:true,order})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for Verify  payment of razorpay
const verifyRazorpay = async(req,res)=>{
    try {
        
        const {razonpay_order} =   req.body
        const orderInfo  = await razorpayInstance.orders.fetch(razonpay_order_id)

        // console.log(orderInfo)

        if (orderInfo.status == "paid") {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payement Successful"})
        }else{
            res.json({success:false,message:"Payement failed"})        
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay,verifyRazorpay };