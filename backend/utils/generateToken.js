import jwt from "jsonwebtoken";

function generateTokenandCookie(user, res) {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ user }, secretKey, { expiresIn: "10d" });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
}

export default generateTokenandCookie;
