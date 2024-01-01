const asyncHandler = require("express-async-handler");
const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")


const messageControllers = {

    //@description     Lazy loading tin nhắn
    //@route           GET /api/message/:chatId
    //@access          Protected
    lazyLoadingMessages: asyncHandler(async (req, res) => {
        try {
            const messages = await Message.find({ chat: req.params.chatId })
                .populate("sender", "name picture email")
                .populate("chat")
                .sort({ created: 1 })
                .skip(req.body.counter || 0)
                .limit(20)

            if (messages.length === 0) {
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

            await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

            res.json(message);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    })
}

module.exports = messageControllers