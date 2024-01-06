const mongoose = require("mongoose");

const DepartmentModel = mongoose.Schema(
    {
        name: {type: String, trim: true},
        room: {type: String , trim: true},
        phone: {type: String , trim: true},
        email: {type: String , trim: true},
        description: {type: String , trim: true},
        interaction: {type: Number, default: 0},
        interactionPerMonth: {type: Number, default: 0},
        numberOfEmployees: {type: Number, default: 0}
    },
    { timestamps: true }
);

const Department = mongoose.model("departments", DepartmentModel);

module.exports = Department;