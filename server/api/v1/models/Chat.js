const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
        }
    },
    { timestamps: true }
);

const Chat = mongoose.model("chats", chatModel);

module.exports = Chat;