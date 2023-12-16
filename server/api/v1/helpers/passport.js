const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        clientID: '839759640259-n3uvounpcpa1qe420qrr88mto9d9ktka.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // const newUser = {
        //     username: profile.displayName
        // }
        // await User.create(newUser);   
        
        return done(null, profile);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});