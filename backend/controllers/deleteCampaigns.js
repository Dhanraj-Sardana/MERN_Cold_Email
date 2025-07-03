import mail from "../model/mail.js";
const deleteCampaigns= async (req,res)=>{
try {
    const { id } = req.params;
    console.log(id);
    
    await mail.findByIdAndDelete(id);
    res.status(200).json({ message: "Campaign deleted" });
    
} catch (error) {
    res.status(500).json({ message: error.message });
}}

export default deleteCampaigns;