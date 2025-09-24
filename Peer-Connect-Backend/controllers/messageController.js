const { Conversation, Message } = require("../models/messageModel");
const User = require("../models/userModel");
const { io, getReceiverSocketId } = require("../socket/socket");

async function sendMessage(req, res) {
  try {
    const senderId = req.session.userId;
    const recieverId = req.body.Id;
    const message = req.body.message;

    if (!recieverId || !message) {
      return res
        .status(400)
        .json({ error: "Sender, receiver, and message are required" });
    }

    const recieverUser = await User.findOne({ _id: recieverId });

    if (!recieverUser) {
      return res.status(404).json({ error: "No such Receiver found" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
        messages: [],
      });
    }

    const newMessage = await new Message({
      senderId,
      recieverId,
      message,
    });

    if (!newMessage) {
      return res.status(500).json({ error: "Error creating message" });
    }

    if (newMessage) {
      conversation.messages.push(newMessage);
      await conversation.save();
      await newMessage.save();

      // Emit real-time message to receiver
      const receiverSocketId = getReceiverSocketId(recieverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', {
          senderId,
          receiverId: recieverId,
          message,
          timestamp: newMessage.createdAt
        });
      }
    }

    res.json({ senderId, recieverId, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getMessages(req, res) {
  try {
    const senderId = req.session.userId;

    const recieverId = req.body.Id;
    if (!recieverId) {
      return res.status(400).json({
        error: "Reciever is required to find conversation",
      });
    }
    const reciever = User.findOne({
      _id: recieverId,
    });
    if (!reciever) {
      res.status(400).json({
        error: "Reciever is invalid",
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      return res.status(400).json({
        error: "conversation not found",
      });
    }

    var messages = [];

    for (const message of conversation.messages) {
      const messageData = await Message.findOne({ _id: message._id });
      messages.push({
        sender: messageData.senderId,
        message: messageData.message,
      });
    }

    res.json(messages);
  } catch (error) {}
}

module.exports = {
  sendMessage,
  getMessages,
};
