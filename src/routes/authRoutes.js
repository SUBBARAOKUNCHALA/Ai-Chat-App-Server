import express from "express";
import { registerUser, loginUser,getAllUsers,getMyFriends  } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import { encryptData,decryptData } from "../utils/encryption.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, getAllUsers);
router.get("/my-friends", protect, getMyFriends);

export default router;
