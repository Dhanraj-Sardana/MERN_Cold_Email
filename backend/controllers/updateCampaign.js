import dotenv from 'dotenv';
dotenv.config();
import mail from "../model/mail.js";
import jwt from 'jsonwebtoken';
const updateCampaign=async (req,res)=>{
try {
    const {id}=req.params; 
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.KEY);
    const userId = decoded.userID;
      const campaign = await mail.findOne({ _id: id, user: userId });
    if (!campaign) return res.status(404).json({ message: "Campaign not found or unauthorized" });
    
const { campaignName, subject, body, followUps } = req.body;
campaign.campaignName = campaignName;
    campaign.subject = subject;
    campaign.body = body;
    campaign.followUps = followUps;
     await campaign.save();

    res.status(200).json({ message: "Campaign updated successfully" });

} catch (error) {
    res.status(500).json({ message: "Server Error" });
}
}

export default updateCampaign;