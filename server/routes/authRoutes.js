const router = require("express").Router();
const passport = require("passport");

// router.get('/', (req, res) => {
//     res.send("User route")
// })

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/');
    }
);

router.get('/', (req, res) => {
    console.log(req.user)
    res.render('index', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
  
module.exports = router;