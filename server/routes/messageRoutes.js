const router = require("express").Router();
const messageControllers = require("../api/v1/controllers/messageControllers")
const protect = require("../api/v1/middlewares/validate")

const test = (req, res, next) => {
    req.user = {
        _id: '657e6be844764c6a5bd1382d'
    };
    next();
}

router.post('/', test, messageControllers.sendMessage)
router.get('/:chatId', test, messageControllers.lazyLoadingMessages)

module.exports = router