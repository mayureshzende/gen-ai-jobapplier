import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const blackListModel = mongoose.model("blacklistToken", blackListSchema);

export default blackListModel;
