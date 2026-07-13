import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "The userName is already taken"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "The Email ID is already registered"],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    middleName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
