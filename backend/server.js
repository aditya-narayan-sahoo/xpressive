import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5432;
app.get("/", (req, res) => {
  res.send("Server is ready at port 5000");
});
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
