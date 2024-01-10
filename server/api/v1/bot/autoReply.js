const find = require("./config.bot")
const Chat = require("../models/Chat")
const Message = require("../models/Message")

async function use_find(value) {
    var result = ''
    try {
        result = await find(value);
    } catch (error) {
        result = "await find(value);"
    }

    return result
}

module.exports = autoReply = async (message) => {
    try {
        let content = await use_find(message.content)
        let newMessage = new Message({
            sender: "657eed61c7fe9a7a9b5c3ac8",
            content: content.document ? content.document.answer : "Hãy hỏi thông tin cụ thể hơn",
            chat: message.chat._id,
            readBy: [false]
        });
        newMessage = await newMessage.save();
        await Chat.findByIdAndUpdate(message.chat, { latestMessage: newMessage });

        console.log("fn return", newMessage);
        return newMessage
    } catch (error) {
        console.log(error);
    }

}