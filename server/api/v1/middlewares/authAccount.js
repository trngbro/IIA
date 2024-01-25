function authuAccount(req, res, next) {
    var userData = req.cookies.userId;
    if (!userData) {
        return res.redirect('/admin/login');
    }
    else {
        next()
    }
};

module.exports = authuAccount;