const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")

module.exports = autoFirstTime = (userId) => {
    const newChat = new Chat({
        users: [userId, "657eed61c7fe9a7a9b5c3ac8"],
        latestMessage: null
    });
    newChat.save();
    const newMessage = new Message({
        sender: "657eed61c7fe9a7a9b5c3ac8",
        content: "Chào mừng đến với IIA",
        chat: newChat._id,
        readBy: [false]
    });
    newMessage.save();
    Chat.findByIdAndUpdate(newChat._id, { latestMessage: newMessage });
    console.log(newMessage);
}