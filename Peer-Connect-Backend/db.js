const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
mongoose.connect(process.env.DB_URI);
console.log("Connected to MongoDB");
const userSchema = new Schema({
    username: String,
    name: String,
    city: String,
    password: String,
    email: String,
    github: String,
    linkedin: String,
    bio: String,
    profilePicture: String,
    projects: Array,
    skills: [Array],
    chats: Array,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    rating: Number,  // New field for user rating
    isNewOrIncomplete: Boolean  // New field for determining if the profile is new/incomplete
});

const messageSchema = new Schema({ 
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recieverId: { type: Schema.Types.ObjectId, ref: 'User',  required: true  },
    message: {
        type: String,
        required: true 
    }
}, {timestamps: true});

const conversationSchema = new Schema({
    participants: [
        {
             type: Schema.Types.ObjectId, 
             ref: 'User' 
        }
    ],
    messages: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Message',
            default: [] 
        }
    ]
}, timestamps = true);

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = {
    User,
    Message,
    Conversation
};

