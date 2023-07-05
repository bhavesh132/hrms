import mongoose from "mongoose";

const reimbursementSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    expenseType: { type: String, required: true },
    invoiceNumber: {type: String},
    invoice: {type: String},   // Upload Bill
    amount: { type: Number, required: true },
    description: { type: String },
    submissionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

const Reimbursement = mongoose.model('Reimbursement', reimbursementSchema);

module.exports = Reimbursement;