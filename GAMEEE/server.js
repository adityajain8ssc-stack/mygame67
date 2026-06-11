npm install mongoose dotenv
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables locally

const app = express();
const server = http.createServer(app);

// Serve your static game files from the Public folder
app.use(express.static('Public')); 

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("🔥 MongoDB Atlas connected successfully!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Your Socket.io and server.listen code goes down here...
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
