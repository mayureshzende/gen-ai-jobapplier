import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    salary: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Interview", "Offer", "Rejected"],
      default: "Saved",
    },
    source: {
      type: String,
      enum: ["LinkedIn", "Indeed", "Referral", "Other"],
      default: "LinkedIn",
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    interviewReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewModel",
      default: null,
    },
  },
  { timestamps: true }
);

const applicationModel = mongoose.model("applications", applicationSchema);

export default applicationModel;
