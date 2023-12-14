const router = require("express").Router();
// const passport = require("passport");

const User = require("../api/v1/models/User")

router.get('/', (req, res) => {
    res.send("User route")
})

module.exports = router;