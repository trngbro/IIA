const router = require("express").Router();
const fakeController = require("../api/v2/Controllers/User.fake")

const checking = (req, res, next) => {
    if (req.headers.authorization === 'Basic abcd') {
        next()
    } else {
        res.status(400).send({
            success: false,
            message: "Token already wrong"
        })
    }
}

router.get('/login', fakeController.loginChecking);
router.get('/chatsData', checking, fakeController.getChatsData);

module.exports = router;