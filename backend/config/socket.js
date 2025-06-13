const { handleJoinRoom, handleSendMessage } = require("../controllers/chatController");

const socketManager = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join room
    socket.on("join_room", (room) => {
      handleJoinRoom(socket, room);
    });

    // Send message
    socket.on("send_message", (data) => {
      handleSendMessage(socket, data);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("🔌 Disconnected:", socket.id);
    });
  });
};

module.exports = socketManager;
