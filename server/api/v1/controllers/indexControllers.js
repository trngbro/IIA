const { jwtDecode } = require('jwt-decode')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const genarate = require("../configs/token.config")
const User = require("../models/User")

const indexController = {
    loginChecking: asyncHandler(async (req, res) => {
        try {
            let user = jwtDecode(req.body.credentialResponse.credential)

            let findUser = await User.findOne({ email: user.email })
            if (!findUser) {
                if (user.hd && user.hd === 'student.tdtu.edu.vn' && user.email_verified) {
                    let newUser = await User.create({
                        azp: user.azp,
                        sub: user.sub,
                        hd: user.hd,
                        email: user.email,
                        email_verified: user.email_verified,
                        name: user.name,
                        picture: user.picture,
                        locale: user.locale,
                        iat: user.iat,
                        exp: user.exp
                    })
                    res.json({
                        success: true,
                        message: "Authen added new one",
                        token: genarate(newUser._id)
                    })
                } else {
                    res.json({
                        success: false,
                        message: "Required sign at tdtu.edu.vn"
                    })
                }
            } else {
                res.json({
                    success: true,
                    message: "Authen added before",
                    data: genarate(findUser._id)
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Fatal error"
            })
        }
    }),
    loginProcessing: asyncHandler(async (req, res) => {
        try {
            if (req.body.password) {
                let findUser

                if (req.body.email) {
                    findUser = await User.findOne({ email: req.body.email })
                } else if (req.body.username) {
                    console.log(findUser)
                    findUser = await User.findOne({ username: req.body.username })
                    console.log(findUser)
                } else {
                    res.json({
                        success: false,
                        message: "Missing infomation for processing"
                    })
                }
                console.log(true)
                if (findUser && await findUser.passwordComparing(req.body.password)) {
                    res.json({
                        success: true,
                        message: "Login success",
                        data: genarate(findUser._id)
                    })
                } else {
                    res.json({
                        success: false,
                        message: "Login fail"
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Missing infomation for processing"
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Fatal error"
            })
        }
    }),
    validateToken: asyncHandler(async (req, res) => {
        try {
            let user = jwt.verify(req.body.token, process.env.JWT)

            if (user) {
                res.json({
                    success: true,
                    message: "Validate success",
                    data: req.body.token
                })
            } else {
                res.json({
                    success: false,
                    message: "Token fail"
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Fatal error"
            })
        }
    }),
    listContact: asyncHandler(async (req, res) => {
        let data = {
            success: true,
            data: [
                { "userId": 'a', 'name': 'Someone', 'faculty': 'Tổ học phí' },
                { "userId": 'b', 'name': 'Someone', 'faculty': 'Phòng công tác học sinh sinh viên' },
                { "userId": 'c', 'name': 'Someone', 'faculty': 'Văn phòng tư vấn học đường' },
                { "userId": 'd', 'name': 'Someone', 'faculty': 'Phòng thanh tra pháp chế' },
                { "userId": 'e', 'name': 'Someone', 'faculty': 'Văn phòng Khoa công nghệ thông tin' },
                { "userId": 'f', 'name': 'Someone', 'faculty': 'Văn phòng Đoàn hội' }
            ]
        }

        res.json({
            success: true,
            message: "Validate success",
            data: data
        })
    })
}

module.exports = indexController