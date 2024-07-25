import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// abc

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      ssl: true,
      tlsInsecure: true,
    });
    console.log("DB connection successful");
  } catch (err) {
    console.log("DB connection error");
    console.error(err);
    process.exit(1);
  }
};
