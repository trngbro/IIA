const path = require('path');
const { getStylesheets, getJavascripts } = require(path.join(__dirname, "../../v1/configs/assets.config"))
const Department = require(path.join(__dirname, "../../v1/models/Department"))
const Staff = require(path.join(__dirname, "../../v1/models/Staff"))
const User = require(path.join(__dirname, "../../v1/models/User"))

const staffController = {
    staff_list: async (req, res) => {
        try{
            let staffs = await Staff.find({})
                .populate('user')
                .populate('department')
                .exec();
            let arr = []

            staffs.forEach(e => {
                arr.push({
                    username: e.user.username,
                    name: e.user.name,
                    email: e.user.email,
                    department: e.department.name,
                    rate: e.rate
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

    getAddStaffPage: async (req, res) => {
        try {
            const departments = await Department.find({});
            let arr = [];
            departments.forEach(e => {
                arr.push({
                    _id: e._id,
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

    addStaff: async (req, res) => {
        try {
            const userId = req.body.userId;
            const departmentId = req.body.departmentId;
            
            const staff = await Staff.findOne({user: userId});
            if(staff){
                return res.status(500).json({ message: "staff exists" });
            }

            const user = await User.findOne({_id: userId});
            const department = await Department.findOne({_id: departmentId});
            if (!user || !department) {
                return res.status(404).json({ error: 'User or department not found' });
            }

            const newStaff = new Staff({ user: userId, department: departmentId });
            await newStaff.save();
            return res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ message: "Add erorr" });
        }
    },

    loadStaff: async (req, res) => {
        try {
            const email = req.body.email;
            const staff = await User.findOne({ email: email });
            if (staff) {
                res.status(200).json({ name: staff.name, _id: staff._id});
            } else {
                res.status(204).json({ name: null, _id: null });
            }
        } catch (error) {
            res.status(404).json({ name: "Not found staff" });
        }
    },
}

module.exports = staffController