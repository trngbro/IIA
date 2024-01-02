const router = require("express").Router();
const chatControllers = require("../api/v1/controllers/chatControllers")
const protect = require("../api/v1/middlewares/validate")


const test = (req, res, next) => {
    req.user = {
        _id: '657e6be844764c6a5bd1382d'
    };
    next();
}

router.get('/', protect, chatControllers.getRecentlyChatUserLimit)
router.post('/', test, chatControllers.accessChat)

module.exports = router
