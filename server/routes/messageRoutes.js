const router = require("express").Router();
const messageControllers = require("../api/v1/controllers/messageControllers")
const protect = require("../api/v1/middlewares/validate")

const test = (req, res, next) => {
    req.user = {
        _id: '657e6be844764c6a5bd1382d'
    };
    next();
}

router.post('/', protect, messageControllers.sendMessage)
router.post('/bot', protect, messageControllers.sendMessageToBot)
router.get('/:chatId/:counter', protect, messageControllers.lazyLoadingMessages)

module.exports = router