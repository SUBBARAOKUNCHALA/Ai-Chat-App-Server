import ChatUser from "../models/User.js";

export const isFriend = async (senderId, receiverId) => {

  const sender = await ChatUser.findById(senderId);

  if (!sender) return false;

  return sender.friends.includes(receiverId);
};
