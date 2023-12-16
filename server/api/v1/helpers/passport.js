const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        clientID: '647101151739-ikk1eovmb00ej5bupnhkostgj1kcjnav.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/',
    },
        async (accessToken, refreshToken, profile, done) => {
            //console.log(profile);
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