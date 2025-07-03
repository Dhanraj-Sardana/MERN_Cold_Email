import dotenv from "dotenv";
dotenv.config();
import mail from "../model/mail.js";
import jwt from 'jsonwebtoken'
const campaigns=async (req,res)=>{
const data=req.body;
 const token=req.cookies.token;
     const decoded = jwt.verify(token, process.env.KEY); 
  console.log(decoded.userID);
try {
   
   const campaign = new mail({
      ...req.body,
      user: decoded.userID
    });
   await campaign.save();
   return res.status(200).json({message:"success"});
} catch (error) {
    return res.status(500).json({message:error.message});
}
}

export default campaigns;