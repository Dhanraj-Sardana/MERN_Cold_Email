import dotenv from 'dotenv'
dotenv.config();
import User from "../model/user.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
const login = async (req, res) => {
      const {password,email}=req.body;
      
       
      
    try {
       
        
        const log_user = await User.findOne({ email });
        if (!log_user) return res.status(404).json({ message: 'user dosenot found with this email' })
        const result = await bcrypt.compare(password, log_user.password);
        if (result) {
            const userID=log_user._id;
            const token=jwt.sign({ email: email, userID: userID }, process.env.KEY);
            res.cookie('token',token,{
                httpOnly:true,
                secure:false
            })
            return res.status(200).json({message:'success'});
        }
        return res.status(401).json({message:'wrong password'});

    } catch (error) {
            return res.status(500).json({message:error.message});
    }
}

export default login;