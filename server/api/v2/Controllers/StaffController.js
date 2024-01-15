const path = require('path');
const { getStylesheets, getJavascripts } = require(path.join(__dirname, "../../v1/configs/assets.config"))
const Department = require(path.join(__dirname, "../../v1/models/Department"))
//const Staff = require(path.join(__dirname, "../../v1/models/Staff"))
const User = require(path.join(__dirname, "../../v1/models/User"))

const staffController = {
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

    staff_add: async (req, res) => {
        try {
            const departments = await Department.find({});
            let arr = [];
            departments.forEach(e => {
                arr.push({
                    id: e._id,
                    name: e.name
                })
            })
            res.render("staff_add",{
                stylesheets: getStylesheets(),
                javascripts: getJavascripts(),
                departments: arr
            })
        } catch (error) {
            console.error(error);
            res.status(400).send("Failed");
        }
    },

    loadStaff: async (req, res) => {
        try {
            const email = req.body.email;
            const staff = await User.findOne({ email: email });
            if (staff) {
                res.status(200).json({ name: staff.name});
            } else {
                res.status(204).json({ name: null });
            }
        } catch (error) {
            res.status(404).json({ name: "Not found staff" });
        }
    },
}

module.exports = staffController