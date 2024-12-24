import express from "express";
import dotenv from "dotenv";
import connectMongo from "./db/database.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5432;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectMongo();
});
