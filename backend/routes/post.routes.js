import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  commentOnPost,
  getLikedPosts,
  likeUnlikePost,
  getFollowingPosts,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.get("/all", protectRoute, getAllPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);

export default router;
