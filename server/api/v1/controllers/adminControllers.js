const { getStylesheets, getJavascripts } = require("../configs/assets.config")

const adminControllers = {
    index: (req, res) => {
        res.render("index", {
            stylesheets: getStylesheets('homepage'),
            javascripts: getJavascripts('homepage')
        })
    },

    student_list: (req, res) => {
        res.render("student_list",{
            stylesheets: getStylesheets('table'),
            javascripts: getJavascripts('table')
        })
    },

    department_list: (req, res) => {
        res.render("department_list",{
            stylesheets: getStylesheets('table'),
            javascripts: getJavascripts('table')
        })
    },

    staff_list: (req, res) => {
        res.render("staff_list",{
            stylesheets: getStylesheets('table'),
            javascripts: getJavascripts('table')
        })
    },

    staff_add: (req, res) => {
        res.render("staff_add",{
            stylesheets: getStylesheets(),
            javascripts: getJavascripts()
        })
    },

    upload_form: (req, res) => {
        res.render("upload_form",{
            stylesheets: getStylesheets(),
            javascripts: getJavascripts()
        })
    },
}

module.exports = adminControllers