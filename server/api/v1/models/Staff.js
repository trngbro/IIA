const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        department: { type: mongoose.Schema.Types.ObjectId, ref: "departments" },
        rate: {type: Number, default: 0.0}
    },
    { timestamps: true }
);

const Staff = mongoose.model("staffs", staffSchema);


module.exports = Staff;