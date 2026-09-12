const mongoose = require('mongoose');

const visaTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    durationDays: { type: Number, required: true },
    fee: { type: Number, required: true, min: 0 },
    processingDays: { type: Number, default: 15 },
    requiredDocuments: [{ type: String }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('VisaType', visaTypeSchema);
