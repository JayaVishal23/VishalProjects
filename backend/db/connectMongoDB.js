import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected:" + conn.connection.host);
  } catch (err) {
    console.log(err);
  }
}

export default connectDB;
