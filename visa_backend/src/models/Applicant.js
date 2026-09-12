const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    applicantId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date },
    nationality: { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportExpiry: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    address: {
      street: String,
      city: String,
      country: String
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Applicant', applicantSchema);
