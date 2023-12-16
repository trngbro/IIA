const router = require("express").Router();
const passport = require("passport");

// router.get('/', (req, res) => {
//     res.send("User route")
// })

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});
module.exports = router;