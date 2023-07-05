const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referringEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  referredCandidate: {
    name: { type: String, required: true },
    fileUrl: { type: String, required: true },  // Resume Field
    contact: {
      mobile: { type: String },
      email: { type: String }
    }
  },
  status: { type: String, enum: ['Pending', 'In Progress', 'Hired', 'Not Selected'], default: 'Pending' },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
