const router = require("express").Router();
const chatControllers = require("../api/v1/controllers/chatControllers")
const protect = require("../api/v1/middlewares/validate")


const test = (req, res, next) => {
    req.user = {
        _id: '659417f89885f634e72cfebe'
    };
    next();
}

router.get('/', protect, chatControllers.getRecentlyChatUserLimit)
router.post('/', protect, chatControllers.accessChat)

module.exports = router
