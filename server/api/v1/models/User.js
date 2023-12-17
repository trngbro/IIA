const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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
    exp: { type: Number },
    password: { type: String },
    username: { type: String }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    if (this.isNew && !this.password && !this.username) {
        const email = this.email || '';
        const username = email.split('@')[0];

        try {
            const hashedPassword = await bcrypt.hash(username, 10);
            this.password = hashedPassword;
            this.username = username;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

UserSchema.methods.passwordComparing = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false
    }
};

/*
//Usage:

const user = await User.findOne({ email: 'example@example.com' });
if (user) {
    const isMatch = await user.comparePassword('passwordToCheck');
    if (isMatch) {
        // Mật khẩu hợp lệ
    } else {
        // Mật khẩu không hợp lệ
    }
}
*/
const User = mongoose.model('users', UserSchema)

module.exports = User