const jwt = require('jsonwebtoken')

const genarateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn: "1d"
    })
}

module.exports = genarateToken