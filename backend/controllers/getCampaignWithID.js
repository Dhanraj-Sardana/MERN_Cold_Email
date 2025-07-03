import mail from "../model/mail.js";
const getCampaignWithID= async (req,res)=>{
try {
    const { id } = req.params;
    const campaign= await mail.findById(id);
          res.status(200).json(campaign);
    
} catch (error) {
    res.status(500).json({message:error.message});
}}

export default getCampaignWithID;