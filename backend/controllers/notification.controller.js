import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImage",
    });
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(`Error in getNotifications Controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteNotifications Controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
