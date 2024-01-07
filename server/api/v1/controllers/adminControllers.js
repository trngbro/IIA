const { getStylesheets, getJavascripts } = require("../configs/assets.config")
const User = require("../models/User")
const Department = require("../models/Department")

const adminControllers = {
    login: (req, res) => {
        res.render("login")
    },

    index: (req, res) => {
        res.render("index", {
            stylesheets: getStylesheets('homepage'),
            javascripts: getJavascripts('homepage')
        })
    },

    student_list: async (req, res) => {
        try{
            let students = await User.find({ hd: /^student/ });
            let arr = []
            students.forEach(e => {
                let date = new Date(e.createdAt);
                const day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
                const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0'+(date.getMonth() + 1);
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

                arr.push({
                    name: e.name,
                    username: e.username,
                    email: e.email,
                    verified: e.verified,
                    createAt: formattedDate
                })
            })
            res.render("student_list",{
                stylesheets: getStylesheets('table'),
                javascripts: getJavascripts('table'),
                students: arr
            })
        }catch{

        }
        
    },

    department_list: async (req, res) => {
        let departments = await Department.find({});
        let arr = [];
        console.log(departments)
        departments.forEach(e => {
            arr.push({
                name: e.name,
                numberOfEmployees: e.numberOfEmployees,
                interaction: e.interaction,
                interactionPerMonth: e.interactionPerMonth
            })
        })
        res.render("department_list",{
            stylesheets: getStylesheets('table'),
            javascripts: getJavascripts('table'),
            departments: arr
        })
    },

    staff_list: async (req, res) => {
        try{
            let staff = await User.find({ hd: /^tdtu/ });
            let arr = []
            staff.forEach(e => {
                let date = new Date(e.createdAt);
                const day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
                const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0'+(date.getMonth() + 1);
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

                arr.push({
                    name: e.name,
                    username: e.username,
                    email: e.email,
                    verified: e.verified,
                    createAt: formattedDate
                })
            })
            res.render("staff_list",{
                stylesheets: getStylesheets('table'),
                javascripts: getJavascripts('table'),
                staff: arr
            })
        }catch{

        }
        
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