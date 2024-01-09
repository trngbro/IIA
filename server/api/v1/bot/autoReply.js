const find = require("./config.bot")
const Chat = require("../models/Chat")
const Message = require("../models/Message")

async function use_find(value) {
    let result = ''
    try {
        result = await find(value);
    } catch (error) {
        result = "await find(value);"
    }

    return result
}

module.exports = autoReply = async (message) => {
    let content = await use_find(message.content)
    console.log(message)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(content)
    const newMessage = new Message({
        sender: "657eed61c7fe9a7a9b5c3ac8",
        content: content.document.answer,
        chat: message.chat._id,
        readBy: [false]
    });
    newMessage.save();
    Chat.findByIdAndUpdate(message.chat, { latestMessage: newMessage });
    console.log(newMessage);
}