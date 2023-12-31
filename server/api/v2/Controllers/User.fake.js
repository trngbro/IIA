const { jwtDecode } = require('jwt-decode')
const { fullCSS, fullJS } = require("../../v1/configs/assets.config")

const userController = {
    loginChecking: (req, res) => {
        res.send("OKKKKK")
    },

    getChatsData: (req, res) => {
        console.log(fullCSS())
        let data = {
            hello: "Test meno",
            success: true,
            data: [
                { "userId": 'a', 'name': 'Someone', 'faculty': 'Tổ học phí' },
                { "userId": 'b', 'name': 'Someone', 'faculty': 'Phòng công tác học sinh sinh viên' },
                { "userId": 'c', 'name': 'Someone', 'faculty': 'Văn phòng tư vấn học đường' },
                { "userId": 'd', 'name': 'Someone', 'faculty': 'Phòng thanh tra pháp chế' },
                { "userId": 'e', 'name': 'Someone', 'faculty': 'Văn phòng Khoa công nghệ thông tin' },
                { "userId": 'f', 'name': 'Someone', 'faculty': 'Văn phòng Đoàn hội' }
            ],
            memo: fullCSS() || "No data exist",
            meno2: fullJS() || "No data exist"
        }

        res.send(data)
    },

    getData4Box: (req, res) => {
        const { userGetData, userContact } = req.query

        let data = {
            success: true,
            userContact: "Trung-Nghia Nguyen",
            status: "active",
            data: [
                {
                    break: false,
                    from: "me",
                    messages: [
                        {
                            message: "H1",
                            time: "12h12"
                        },
                        {
                            message: "H2",
                            time: "12h12"
                        }
                    ]
                },
                {
                    from: "you",
                    messages: [
                        {
                            message: "H3",
                            time: "12h12"
                        },
                        {
                            message: "H4",
                            time: "12h12"
                        },
                        ,
                        {
                            message: "H5",
                            time: "12h12"
                        }
                    ]
                }
            ]
        }

        res.send(data)
    }
}

module.exports = userController