// import mongoose from 'mongoose';


// const connectDB = async () => {
    
//     mongoose.connection.on('connected',() => console.log("Database Connected"))

//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }

// export default connectDB;  

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

export default connectDB;
