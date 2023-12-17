const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decode = jwt.verify(token, process.env.JWT)

            req.user = await User.findById(decode.id).select("-password")


            console.log(req.user)

            next()
        } catch (error) {
            res.json({
                success: false,
                message: "Not authorized",
                error: error
            })
        }
    } else {
        res.json({
            success: false,
            message: "Not authorized",
            error: "No header"
        })
    }

    if (!token) {
        res.json({
            success: false,
            message: "Not authorized",
            error: "No token"
        })
    }
})

module.exports = { protect }