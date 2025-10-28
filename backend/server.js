import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// api endpoint
app.use('/api/admin',adminRouter);   //localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
    res.send("API Working is Good");
});


 app.listen(port, () => console.log(`Server Started on port ${port}`));

// // Connect to MongoDB and start server
// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(port, () => console.log(`Server Started on port ${port}`));
//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();