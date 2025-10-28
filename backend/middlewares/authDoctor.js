import jwt from 'jsonwebtoken';


//doctor authentication middleware
const authDoctor = async (req,res,next) =>{
    try{
        const {dtoken} = req.headers;
        // const token = req.headers.authorization?.split(" ")[1];
        if(!dtoken){
            return res.json({success:false,message:"Not Authorized, Login again"})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)

        // req.docId = token_decode.id;
        req.docId = token_decode.id.toString();
        // req.user = { id: token_decode.id };
        
        // console.log("Authenticated user ID from token:", req.user.id);
        next()

    }catch(error){
    console.log(error)
    res.json({success:false, message:error.message});
    }
}

export default authDoctor;

