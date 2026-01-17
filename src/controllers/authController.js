import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { encryptData,decryptData } from "../utils/encryption.js";
import generateToken from "../utils/generateToken.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    // Encrypt sensitive fields only
    const encryptedUsers = users.map(user => ({
      _id: user._id.toString(),
      username: encryptData(user.username),
      email: encryptData(user.email),
      createdAt: user.createdAt
    }));
    // console.log("encrypted response",encryptedUsers)

    res.status(200).json(encryptedUsers);

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};