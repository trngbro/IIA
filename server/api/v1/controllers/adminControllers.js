const { getStylesheets, getJavascripts } = require("../configs/assets.config")
const User = require("../models/User")

const adminControllers = {
    index: (req, res) => {
        res.render("index", {
            stylesheets: getStylesheets('homepage'),
            javascripts: getJavascripts('homepage')
        })
    },

    login: (req, res) => {
        res.render("login", {layout: false})
    },

    loginChecking: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username, hd: /^iia/ }).exec();
            
            if ( await user.passwordComparing(req.body.password) ) {
                res.cookie('userId', user._id);
                res.cookie('userName', user.name).cookie('userImageUser', user.picture);
                res.redirect('/admin/v2/home');
            } else {
                res.redirect('login?login=password-or-username-be-not-correct')
            }
        } catch (error) {
            console.log(error)
            res.redirect('login?login=password-or-username-be-not-correct')
        }
    },

    logOut: async (req, res) => {
        res.clearCookie('userId');
        res.clearCookie('userName');
        res.clearCookie('userImageUser');
        res.redirect('/admin/login');
    },
}

module.exports = adminControllers