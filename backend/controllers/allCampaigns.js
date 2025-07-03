import dotenv from 'dotenv';
dotenv.config();
import mail from "../model/mail.js";
import jwt from 'jsonwebtoken';
const allCampaigns = async (req, res) => {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.KEY);
    const userID = decode.userID;
    try {
        const campaigns = await mail.find({ user: userID }).sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default allCampaigns;