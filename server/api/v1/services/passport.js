const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");
const keys = require('../configs/key');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            if (profile._json.hd === 'student.tdtu.edu.vn') { // Kiểm tra domain email là @tdtu.edu.vn
                const existingUser = await User.findOne({ gmail_id: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    gmail_id: profile.id
                });

                const savedUser = await newUser.save();
                console.log("done");
                return done(null, savedUser);
            } else {
                return done(null, false, { message: 'Email không hợp lệ' });
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

passport.serializeUser((user, done) => {
    console.log("serialize")
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = {
    ensureAuthenticated: (req, res, next) => {
        console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
            next();
        }
        res.redirect('/auth/login');
    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/success');
    }
};
