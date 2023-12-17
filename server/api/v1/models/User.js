const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    azp: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        unique: true
    },
    hd: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    locale: { type: String },
    iat: { type: Number },
    exp: { type: Number }
}, {
    timestamps: true
})

const User = mongoose.model('users', UserSchema)

module.exports = User