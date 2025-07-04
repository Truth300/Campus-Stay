import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/campus-stay";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      // these are recommended by mongoose docs
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}