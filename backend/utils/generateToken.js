import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // cookie cannot be accessed by client-side scripts, prevents XSS attacks
    sameSite: "strict", // cookie is sent only to the same site as the one that originated, prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
};
