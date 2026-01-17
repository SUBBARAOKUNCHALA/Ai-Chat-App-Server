import express from "express";
import protect from "../middlewares/authMiddleware.js";

import {
  sendFriendRequest,
  getMyRequests,
  acceptFriendRequest
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/send", protect, sendFriendRequest);
router.get("/requests", protect, getMyRequests);
router.put("/accept", protect, acceptFriendRequest);

export default router;
