const passport = require('passport');

exports.getLoginForm = (req, res) => {
    // Render login form
    res.send('login');
};

exports.authenticateWithGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.handleGoogleCallback = (req, res) => {
    // This function will only be called if authentication succeeds
    console.log("Google authentication successful");
    res.redirect('/auth/success');
};

exports.getSuccessPage = (req, res) => {
    res.send('success');
};

exports.getFailurePage = (req, res) => {
    res.send('failure');
};
