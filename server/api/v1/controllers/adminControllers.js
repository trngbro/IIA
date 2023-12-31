const { getStylesheets, getJavascripts } = require("../configs/assets.config")

const adminControllers = {
    test: (req, res) => {
        res.render("index", {
            stylesheets: getStylesheets(),
            javascripts: getJavascripts()
        })
    }
}

module.exports = adminControllers