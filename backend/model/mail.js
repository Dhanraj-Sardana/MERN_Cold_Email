import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema({
  delayInDays: {
    type: Number,
    required: true,
    min: 1
  },
  subject: {
    type: String,
    required: true
  },
  bodyTemplate: {
    type: String,
    required: true
  }
}, { _id: false });

const mailSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  followUps: [followUpSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Mail", mailSchema);
