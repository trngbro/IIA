const asyncHandler = require("express-async-handler");

const chatControllers = {
    //@description     Lấy danh sách những người liên hệ gần đây với điều kiện tin nhắn gần nhất trong 7 ngày và được tạo liên hệ
    //@route           POST /api/chat/
    //@access          Protected
    getRecentlyChatUserLimit: asyncHandler((req, res) => {

    })
}

module.exports = chatControllers