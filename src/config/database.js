import mongoose from "mongoose";

const connectTODatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.warn("The connection to DB is successful");
  } catch (error) {
    console.error("there is error connecting to DB:", error?.message);
  }
};

export { connectTODatabase };
