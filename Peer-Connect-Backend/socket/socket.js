const Server = require('socket.io').Server;
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000', 
      'https://peer-connect-frontend.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  io.emit('onlineUsers', Object.keys(userSocketMap));

  // Listen for new messages
  socket.on('sendMessage', (messageData) => {
    const { receiverId, senderId, message } = messageData;
    const receiverSocketId = getReceiverSocketId(receiverId);
    
    if (receiverSocketId) {
      // Send message to specific receiver
      io.to(receiverSocketId).emit('newMessage', {
        senderId,
        receiverId,
        message,
        timestamp: new Date()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete userSocketMap[userId];
    io.emit('onlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
