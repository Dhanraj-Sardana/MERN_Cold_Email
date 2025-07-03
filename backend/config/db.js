import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config();
const  connectDB= async ()=>{
    mongoose.set("strictQuery",true)
try {
    await mongoose.connect(process.env.MONGO_URL);
console.log('mongodb connected');

} catch (error) {
    console.error(`error in connecting mongodb ${error}`);
    
}
}

export default connectDB;