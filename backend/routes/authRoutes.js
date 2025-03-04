import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import User from "../modelsDB/userModel.js";
import bcrypt from "bcrypt";
import generateTokenandCookie from "../utils/generateToken.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();
const saltRounds = 10;

router.post("/me", protectedRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server EError" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, fullname, password } = req.body;
  try {
    //email correct form - verify
    //usename exost in DB or not
    //email exist in DB or not
    // if all above satisfied then
    //hash the password and then generate token and store all details in DB

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already taken" });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      fullname: fullname,
      email: email,
      password: passwordHash,
    });

    generateTokenandCookie(newUser, res);
    await newUser.save();

    return res.status(201).json({
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profile: newUser.profile,
      bio: newUser.bio,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  //check for entered username in DB if found then compare password by hashing if matched then login
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    return res.status(400).json({ error: "Invalid credintials" });
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credintials" });
  }

  generateTokenandCookie(existingUser, res);
  return res.status(201).json({
    fullname: existingUser.fullname,
    username: existingUser.username,
    email: existingUser.email,
    followers: existingUser.followers,
    following: existingUser.following,
    profile: existingUser.profile,
    bio: existingUser.bio,
  });
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res
      .status(200)
      .json({ message: "Logged out successfully, cookies cleared!" });
  } catch (err) {
    console.log(err);
  }
});

export default router;
