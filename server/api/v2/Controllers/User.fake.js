const userController = {
    loginChecking: (req, res) => {
        let data = {
            success: true,
            token: "abcd",
            userId: "123"
        }
        res.send(data)
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
    }
}

module.exports = userController