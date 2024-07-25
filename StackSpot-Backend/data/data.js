import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// abc

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsInsecure: true, // This disables certificate validation (use with caution)
    });
    console.log("DB connection successful");
  } catch (err) {
    console.log("DB connection error");
    console.error(err);
    process.exit(1);
  }
};
