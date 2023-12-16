const { jwtDecode } = require('jwt-decode')

const userController = {
    loginChecking: (req, res) => {
        console.log(jwtDecode(req.body.credentialResponse.credential))
        res.send("OKKKKK")
    },

    getChatsData: (req, res) => {
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