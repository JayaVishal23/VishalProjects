import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const port = 5000;

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies & authentication headers
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
  connectDB();
});
