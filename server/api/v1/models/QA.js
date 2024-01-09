const mongoose = require("mongoose");

const QASchema = mongoose.Schema(
    {
        question: { type: String },
        answer: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const QA = mongoose.model("qadata", QASchema);


module.exports = QA;
