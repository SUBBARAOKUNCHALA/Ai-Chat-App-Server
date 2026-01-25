import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatUser",
    required: true
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatUser",
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("FriendRequest", friendRequestSchema);
