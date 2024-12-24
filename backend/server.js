import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectMongo from "./db/database.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json({ limit: "7mb" }));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectMongo();
});
