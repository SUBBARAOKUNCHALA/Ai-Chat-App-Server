import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatUser"
    }]
  },
  { timestamps: true }
);

export default mongoose.model("ChatUser", userSchema);
