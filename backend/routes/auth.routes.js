import express from "express";
const router = express.Router();

router.get("/me", (req, res) => {
  res.send("Hello from auth routes");
});
router.post("/signup");
router.post("/login");
router.post("/logout");

export default router;
