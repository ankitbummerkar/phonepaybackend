import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
