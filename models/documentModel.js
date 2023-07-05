import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String },
    uploadDate: { type: Date, default: Date.now }
},{timestamps: true});

const Document = mongoose.model('Document', documentSchema)

module.exports = Document;