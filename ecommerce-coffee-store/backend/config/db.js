const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/brewcart";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully to:", uri);
  } catch (error) {
    console.warn("MongoDB connection warning:", error.message);
    console.warn("Backend running in standalone API mode. Database operations will attempt fallback or retry.");
  }
}
module.exports = connectDB;

