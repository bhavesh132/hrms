import mongoose from "mongoose";

const PayRollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    },
    salary: {type: Number, required: true},
    deductions: [{
        title: {type: String},
        amount: {type: Number}
    }],
    tax: {type: Number}
});

const PayRoll = mongoose.model("PayRoll", PayRollSchema);

module.exports = PayRoll;