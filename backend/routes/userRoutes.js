import express from "express";
import User from "../modelsDB/userModel.js";
import bcrypt from "bcrypt";
import protectedRoute from "../middleware/protectedRoute.js";
import router from "./authRoutes.js";

// const router = express.Router();

router.get("/profile/:username", protectedRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in profile controller", error.message);
    res.status(500).json({ error: "Internal Server EError" });
  }
});

export default router;
