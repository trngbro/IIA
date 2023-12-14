const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('users', UserSchema)

module.exports = User