const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config(); // Allows testing locally with a .env file

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your 2D game files from the Public folder
app.use(express.static('Public'));

// 1. GET THE MONGO URL FROM RENDER/ENV
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ ERROR: MONGODB_URI is not defined in environment variables!");
} else {
  // 2. CONNECT TO MONGO DB
  mongoose.connect(mongoURI)
    .then(() => console.log("🔥 SUCCESS: Connected to MongoDB Atlas!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
}

// 3. BASIC MULTIPLAYER SOCKET LOGIC (Placeholder)
io.on('connection', (socket) => {
  console.log(`👤 A player connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`❌ Player disconnected: ${socket.id}`);
  });
});

// 4. START THE SERVER
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎮 Game server is running on port ${PORT}`);
});
