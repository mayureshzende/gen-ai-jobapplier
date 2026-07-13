import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: [
      {
        role: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        startDate: Date,
        endDate: Date,
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: String,
        bullets: [String],
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: Date,
        expirationDate: Date,
        credentialUrl: String,
      },
    ],
    resumeUrl: String,
  },
  { timestamps: true }
);

const profileModel = mongoose.model("profiles", profileSchema);

export default profileModel;
