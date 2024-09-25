const { User, Conversation, Message } = require("../db");

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
    }

    res.json({ senderId, recieverId, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  sendMessage,
};
