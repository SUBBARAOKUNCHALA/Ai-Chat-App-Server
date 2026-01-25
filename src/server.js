import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import setupSocket from "./socket/socket.js";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
setupSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
