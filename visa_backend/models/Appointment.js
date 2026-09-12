const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    appointmentNumber: { type: String, required: true, unique: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    type: {
      type: String,
      enum: ['biometrics', 'interview', 'document_submission', 'collection'],
      default: 'biometrics'
    },
    location: { type: String, default: 'Main Office' },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no_show'],
      default: 'scheduled'
    },
    notes: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
