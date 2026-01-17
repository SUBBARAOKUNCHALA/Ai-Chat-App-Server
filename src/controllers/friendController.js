import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// ================= SEND REQUEST =================

export const sendFriendRequest = async (req, res) => {

  const senderId = req.user.id;
  const { receiverId } = req.body;   // ✅ from body now

  try {

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ message: "You can't add yourself" });
    }

    const alreadyFriend = await User.findOne({
      _id: senderId,
      friends: receiverId
    });

    if (alreadyFriend) {
      return res.status(400).json({ message: "Already friends" });
    }

    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = new FriendRequest({
      sender: senderId,
      receiver: receiverId
    });

    await request.save();

    res.status(200).json({ message: "Friend request sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Send request failed" });
  }
};



// ================= GET MY REQUESTS =================

export const getMyRequests = async (req, res) => {

  try {

    const requests = await FriendRequest.find({
      receiver: req.user.id,
      status: "pending"
    }).populate("sender", "username email");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


// ================= ACCEPT REQUEST =================



export const acceptFriendRequest = async (req, res) => {
  try {

    const { requestId } = req.body;
    const userId = req.user._id; // from auth middleware

    // ================= VALIDATION =================

    if (!requestId) {
      return res.status(400).json({
        message: "requestId is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        message: "Invalid requestId"
      });
    }

    // ================= FIND REQUEST =================

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    // ================= SECURITY CHECK =================

    // Only receiver can accept
    if (request.receiver.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    // Already handled
    if (request.status === "accepted") {
      return res.status(400).json({
        message: "Already accepted"
      });
    }

    // ================= UPDATE REQUEST =================

    request.status = "accepted";
    await request.save();

    // ================= ADD FRIENDS BOTH SIDES =================

    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.receiver }
    });

    await User.findByIdAndUpdate(request.receiver, {
      $addToSet: { friends: request.sender }
    });

    res.status(200).json({
      message: "Friend request accepted successfully"
    });

  } catch (error) {

    console.error("Accept friend error:", error);

    res.status(500).json({
      message: "Accept failed"
    });

  }
};

