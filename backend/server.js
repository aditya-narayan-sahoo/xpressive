import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectMongo from "./db/database.js";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json({ limit: "7mb" }));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectMongo();
});
