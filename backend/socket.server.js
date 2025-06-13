const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const socketManager = require("./socket/socketManager");

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Manage WebSocket events
socketManager(io);

// Start serverv
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Socket Server running on http://localhost:${PORT}`);
});
