const asyncHandler = require("express-async-handler");
const User = require("../models/User")
const Chat = require("../models/Chat")
const Message = require("../models/Message")

function getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
}

function testDate() {
    const now = new Date();

    return new Date(now.getTime() - 1234 * 24 * 60 * 60 * 1000);
}

const chatControllers = {
    //@description     Lấy danh sách những người liên hệ gần đây với điều kiện tin nhắn gần nhất trong 7 ngày và được tạo liên hệ
    //@route           POST /api/chat/
    //@access          Protected
    getRecentlyChatUserLimit: asyncHandler(async (req, res) => {
        try {
            await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("users", "-password")
                .populate({
                    path: "latestMessage",
                    match: {
                        updatedAt: { $gte: testDate() },
                    },
                })
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "name picture email",
                    });
                    console.log(results);
                    res.json({
                        success: true,
                        message: "Fetch data successfully",
                        data: results
                    })
                });
            let temp_search = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("users", "-password")
            console.log(temp_search);
        } catch (error) {
            res.json({
                success: false,
                message: "Fetch data failled",
                data: error
            })
            throw new Error(error.message);
        }
    }),

    //@description     Tạo hoặc lấy thông tin đoạn chat
    //@route           POST /api/chat/
    //@access          Protected
    accessChat: asyncHandler(async (req, res) => {

        const { userId } = req.body;

        if (!userId) {
            return res.json({
                success: false,
                message: "User not send with request",
                data: null
            })
        }

        var isChat = await Chat.find({
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name picture email",
        });

        if (isChat.length > 0) {
            return res.json({
                success: true,
                message: "Connect to staff",
                data: isChat[0]
            })
        } else {
            var chatData = {
                users: [req.user._id, userId],
            };

            try {
                const createdChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );
                res.json({
                    success: true,
                    message: "new connect to staff",
                    data: FullChat
                })
            } catch (error) {
                res.json({
                    success: false,
                    message: "Fail to connect",
                    data: error
                })
                throw new Error(error.message);
            }
        }
    })
}

module.exports = chatControllers