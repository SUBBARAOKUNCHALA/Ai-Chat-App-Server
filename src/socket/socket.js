import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // later restrict to frontend URL
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join room (userId)
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Send message
    socket.on("sendMessage", (data) => {
      const { senderId, receiverId, content } = data;

      // Send message to receiver room
      io.to(receiverId).emit("receiveMessage", {
        senderId,
        content,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default setupSocket;
