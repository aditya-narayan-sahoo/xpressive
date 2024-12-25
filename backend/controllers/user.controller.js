import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error in getUserProfile: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const userFollowedByMe = await User.findById(userId).select("following");
    const matchCondition = { _id: { $ne: userId } };
    if (userFollowedByMe.following.length > 0) {
      matchCondition._id = { $nin: userFollowedByMe.following };
    }
    const suggestedUsers = await User.aggregate([
      { $match: matchCondition },
      { $sample: { size: 10 } },
      { $project: { password: 0 } }, // Exclude the password field directly in the aggregation
    ]);
    const finalSuggestedUsers = suggestedUsers
      .filter((user) => user._id.toString() !== userId.toString())
      .slice(0, 4);
    res.status(200).json(finalSuggestedUsers);
    /* 
      CAN ALSO USE THE BELOW CODE TO ACHIEVE THE SUGGESTED USERS FUNCTIONALITY
      const users = await User.aggregate([
        { $match: { _id: { $ne: userId } } },
        { $sample: { size: 10 } },
      ]);
      const filteredUsers = users.filter(
        (user) => !userFollowedByMe.following.includes(user._id)
      );
      const suggestedUsers = filteredUsers.slice(0, 4);
      suggestedUsers.forEach((user) => (user.password = null));
      res.status(200).json(suggestedUsers); 
    */
  } catch (error) {
    console.error(`Error in getSuggestedUsers: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }
    if (!userToModify || !currentUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      // send notification to the user being followed
      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await notification.save();
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.error(`Error in followUnfollowUser: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImage, coverImage } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      (!newPassword && currentPassword) ||
      (newPassword && !currentPassword)
    ) {
      return res
        .status(400)
        .json({ message: "Please provide both current and new password" });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
      user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
    }
    if (profileImage) {
      if (user.profileImage) {
        // cloudinary url format: https://res.cloudinary.com/<cloud_name>/image/upload/<public_id>.<format>
        await cloudinary.uploader.destroy(
          user.profileImage.split("/").pop().split(".")[0]
        ); // get the previous image name & delete it from cloudinary
      }
      const uploadedImage = await cloudinary.uploader.upload(profileImage);
      profileImage = uploadedImage.secure_url;
    }
    if (coverImage) {
      if (user.coverImage) {
        await cloudinary.uploader.destroy(
          user.coverImage.split("/").pop().split(".")[0]
        );
      }
      const uploadedImage = await cloudinary.uploader.upload(coverImage);
      coverImage = uploadedImage.secure_url;
    }
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImage = profileImage || user.profileImage;
    user.coverImage = coverImage || user.coverImage;

    user = await user.save();
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.error(`Error in updateUser: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
