const asyncHandler = require("express-async-handler");
const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")
const autoReply = require("../bot/autoReply")


const messageControllers = {

    //@description     Lazy loading tin nhắn
    //@route           GET /api/message/:chatId
    //@access          Protected
    lazyLoadingMessages: asyncHandler(async (req, res) => {
        try {
            if (await Message.find({ chat: req.params.chatId }) === req.params.counter) {
                return res.json({
                    success: true,
                    message: "Has fetch all yet",
                    data: null
                })
            }
            const messages = await Message.find({ chat: req.params.chatId })
                .populate("sender", "name picture email")
                .populate("chat")
                .sort({ createdAt: -1 })
                .limit(req.params.counter + 20)

            if (messages.length === req.params.counter) {
                res.json({
                    success: false,
                    message: "Nothing updated",
                    data: null
                })
            } else {
                res.json({
                    success: true,
                    message: `Fetch chat successfully from ${req.body.counter || 0}, counter ${messages.length}`,
                    data: messages
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Fail to get data",
                data: null
            })
            throw new Error(error.message);
        }
    }),

    //@description     Create New Message
    //@route           POST /api/Message/
    //@access          Protected
    sendMessage: asyncHandler(async (req, res) => {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            return res.json({
                success: false,
                message: "Invalid data passed into request",
                data: null
            })
        }

        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        try {

            let message = new Message(newMessage);
            await message.save();

            message = await message.populate("sender", "name picture");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "name picture email",
            });

            let chat = await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

            if (chat.users.includes("657eed61c7fe9a7a9b5c3ac8")) {
                console.log("send to bot", message);
                autoReply(message)
            }

            res.json({
                success: true,
                message: "Message sent successfully",
                data: message
            })
        } catch (error) {
            res.json({
                success: false,
                message: "Falal errors",
                data: error
            })
        }
    })
}

module.exports = messageControllers