const Server = require('socket.io').Server;
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  io.emit('onlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete userSocketMap[userId];
    io.emit('onlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io };
