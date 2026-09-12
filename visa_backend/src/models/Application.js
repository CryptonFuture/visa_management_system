const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    applicationNumber: { type: String, required: true, unique: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    visaType: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaType', required: true },
    destinationCountry: { type: String, required: true },
    purpose: { type: String, default: '' },
    travelDate: { type: Date },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'documents_required', 'approved', 'rejected', 'issued', 'cancelled'],
      default: 'draft'
    },
    priority: {
      type: String,
      enum: ['normal', 'urgent', 'express'],
      default: 'normal'
    },
    fee: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid', 'refunded'],
      default: 'unpaid'
    },
    documents: [{
      name: String,
      status: { type: String, enum: ['pending', 'submitted', 'verified', 'rejected'], default: 'pending' },
      notes: String
    }],
    notes: { type: String, default: '' },
    rejectionReason: { type: String, default: '' },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { type: Date },
    decidedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
