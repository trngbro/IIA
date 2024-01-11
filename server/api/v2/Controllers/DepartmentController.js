const path = require('path');
const { getStylesheets, getJavascripts } = require(path.join(__dirname, "../../v1/configs/assets.config"))
const Department = require(path.join(__dirname, "../../v1/models/Department"))

const departmentController = {
    getList: async (req, res) => {
        let departments = await Department.find({});
        let arr = [];
        departments.forEach(e => {
            arr.push({
                id: e._id,
                name: e.name,
                room: e.room,
                phone: e.phone,
                email: e.email,
                description: e.description,
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

    getAddPage: (req, res) => {
        res.render("department_add",{
            stylesheets: getStylesheets(),
            javascripts: getJavascripts()
        })
    },

    deleteDepartment: async (req, res) => {
        const id = req.params.id;
        const department = await await Department.findOne({_id: id })
        if (!department) {
            return res.status(404).send('department not found.');
        }
        const result = await Department.findOneAndDelete({
            _id: id
        });
        if (result) {
            return res.status(200).send();
        } else {
            return res.status(500).send('Internal Server Error');
        }
    },

    addDepartment: async (req, res) => {
        try {
            const {
                name,
                room,
                phone,
                email,
                description
            } = req.body;

            const department = new Department({
                name,
                room,
                phone,
                email,
                description
            });

            await department.save();

            res.redirect("/admin/v2/departments")
        } catch (error) {
            res.status(500).send(error)
        }
    },

    updateDepartment: async (req, res) => {
        try {
            await Department.findOneAndUpdate({
                _id: req.body.departmentId
            }, {
                name: req.body.name,
                room: req.body.room,
                phone: req.body.phone,
                email: req.body.email,
                description: req.body.description
            })
            res.status(200).send("Successed")
        } catch (error) {
            console.log(error)
            res.status(400).send("Failed")
        }
    }
}

module.exports = departmentController