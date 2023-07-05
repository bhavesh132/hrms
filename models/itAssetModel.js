import mongoose from 'mongoose';

const ItAssetSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    assetType: { type: String, required: true },
    assetName: { type: String, required: true },
    assetSerialNumber: { type: String, required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    isReturned: { type: Boolean, default: false },
})

const ItAsset = mongoose.model("ItAsset", ItAssetSchema);

module.exports = ItAsset;
