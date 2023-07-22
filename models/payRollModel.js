import mongoose from "mongoose";

const PayRollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    },
    bankDetails: {
        accountHolder: {type: String},
        accountNumber: {type: Number},
        bankName: {type: String},
        ifscCode: {type: String}
    },
    salary: [{
        title: {type: String},
        amount: {type: Number}
    }],
    deductions: [{
        title: {type: String},
        amount: {type: Number}
    }],
});

const PayRoll = mongoose.model("PayRoll", PayRollSchema);

module.exports = PayRoll;