import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = 5000;

dotenv.config();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
  connectDB();
});
