const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")
const { botId } = require("../bot/model.bot")

module.exports = autoFirstTime = (userId) => {
    const newChat = new Chat({
        users: [userId, botId],
        latestMessage: null
    });
    newChat.save();
    const newMessage = new Message({
        sender: botId,
        content: "Chào mừng đến với IIA",
        chat: newChat._id,
        readBy: [false]
    });
    newMessage.save();
    Chat.findByIdAndUpdate(newChat._id, { latestMessage: newMessage });
    console.log(newMessage);
}