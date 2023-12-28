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

router.post('/login', fakeController.loginChecking);
router.get('/chatsData', fakeController.getChatsData);
router.get('/chatData4Box', checking, fakeController.getData4Box);

module.exports = router;