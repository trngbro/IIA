const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")

module.exports = autoFirstTime = (userId) => {
    const newChat = new Chat({
        users: [userId],
        latestMessage: null
    });
    newChat.save();
    const newMessage = new Message({
        sender: null,
        content: "Chào mừng đến với IIA",
        chat: newChat._id,
        readBy: [false]
    });
    newMessage.save();
    console.log(newMessage);
}