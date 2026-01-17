import Message from "../models/Message.js";
import { isFriend } from "../utils/checkFriend.js";
// Send Message
export const sendMessage = async (req, res) => {
  try {
    const allowed = await isFriend(senderId, receiverId);
    const { receiverId, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Message content required" });
    }
    else if (!allowed)
      return res.status(403).json({
        message: "Please add friend before chatting"
      });

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Chat Messages (User ↔ User)
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
