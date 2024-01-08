const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")

const newChat = new Chat({
    users: ["659b9bf4dc5c97b94eacbf9f", "6598eafe04bfc0f5b9ed29cc"],
    latestMessage: null
});
newChat.save();
const newMessage = new Message({
    sender: "6598eafe04bfc0f5b9ed29cc",
    content: "Xin chào mình là Phúc sủa bậy",
    chat: newChat._id,
    readBy: [false]
});
newMessage.save();
Chat.findByIdAndUpdate(newChat._id, { latestMessage: newMessage });
console.log(newMessage, newChat);
process.exit()
