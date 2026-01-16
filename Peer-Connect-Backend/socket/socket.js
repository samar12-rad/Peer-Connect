const Server = require('socket.io').Server;
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);

      // Define allowed origins
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://peer-connect-frontend.vercel.app',
        'https://peer-connect-eight.vercel.app', // Current Vercel deployment
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      }
      // Allow any Vercel deployment for peer-connect
      else if (
        origin &&
        origin.includes('peer-connect') &&
        origin.includes('vercel.app')
      ) {
        console.log('🔌 Socket.IO - Allowing Vercel deployment:', origin);
        callback(null, true);
      }
      // Allow localhost for development
      else if (
        origin &&
        (origin.includes('localhost') || origin.includes('127.0.0.1'))
      ) {
        callback(null, true);
      } else {
        console.log('🚫 Socket.IO - Blocked by CORS:', origin);
        callback(new Error('Not allowed by Socket.IO CORS'));
      }
    },
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
  // Listen for new messages
  // socket.on('sendMessage', (messageData) => {
  // Legacy support - we now use the HTTP API for sending messages to ensure persistence
  // console.log('⚠️ client using socket.emit("sendMessage") - ignoring, should use API');
  // });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete userSocketMap[userId];
    io.emit('onlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
