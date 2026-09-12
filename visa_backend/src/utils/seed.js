const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Applicant = require('../models/Applicant');
const VisaType = require('../models/VisaType');
const Application = require('../models/Application');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      User.deleteMany(),
      Applicant.deleteMany(),
      VisaType.deleteMany(),
      Application.deleteMany()
    ]);

    await User.create([
      { name: 'Admin User', email: 'admin@visa.com', password: 'admin123', role: 'admin' },
      { name: 'Agent One', email: 'agent@visa.com', password: 'agent123', role: 'agent' }
    ]);

    const visaTypes = await VisaType.insertMany([
      {
        name: 'Tourist Visa',
        code: 'TRV',
        description: 'Short stay tourism visa',
        durationDays: 90,
        fee: 15000,
        processingDays: 10,
        requiredDocuments: ['Passport Copy', 'Photo', 'Bank Statement', 'Travel Itinerary']
      },
      {
        name: 'Business Visa',
        code: 'BSV',
        description: 'Business meetings and conferences',
        durationDays: 180,
        fee: 25000,
        processingDays: 15,
        requiredDocuments: ['Passport Copy', 'Photo', 'Invitation Letter', 'Company Letter', 'Bank Statement']
      },
      {
        name: 'Student Visa',
        code: 'STV',
        description: 'Study abroad visa',
        durationDays: 365,
        fee: 35000,
        processingDays: 30,
        requiredDocuments: ['Passport Copy', 'Photo', 'Admission Letter', 'Financial Proof', 'Academic Transcripts']
      },
      {
        name: 'Work Visa',
        code: 'WRV',
        description: 'Employment visa',
        durationDays: 730,
        fee: 50000,
        processingDays: 45,
        requiredDocuments: ['Passport Copy', 'Photo', 'Job Offer', 'Employment Contract', 'Police Clearance']
      }
    ]);

    const applicants = await Applicant.insertMany([
      {
        applicantId: 'APP00001',
        firstName: 'Ali',
        lastName: 'Raza',
        email: 'ali.raza@email.com',
        phone: '03001234567',
        nationality: 'Pakistani',
        passportNumber: 'AB1234567',
        gender: 'male',
        dateOfBirth: new Date('1990-05-15')
      },
      {
        applicantId: 'APP00002',
        firstName: 'Sara',
        lastName: 'Khan',
        email: 'sara.khan@email.com',
        phone: '03009876543',
        nationality: 'Pakistani',
        passportNumber: 'CD7654321',
        gender: 'female',
        dateOfBirth: new Date('1995-08-22')
      },
      {
        applicantId: 'APP00003',
        firstName: 'Hassan',
        lastName: 'Ahmed',
        email: 'hassan@email.com',
        phone: '03211234567',
        nationality: 'Pakistani',
        passportNumber: 'EF9876543',
        gender: 'male',
        dateOfBirth: new Date('1988-01-10')
      }
    ]);

    await Application.create([
      {
        applicationNumber: 'VA000001',
        applicant: applicants[0]._id,
        visaType: visaTypes[0]._id,
        destinationCountry: 'United Kingdom',
        purpose: 'Tourism',
        status: 'under_review',
        priority: 'normal',
        fee: 15000,
        paymentStatus: 'paid',
        documents: visaTypes[0].requiredDocuments.map(n => ({ name: n, status: 'submitted' })),
        submittedAt: new Date()
      },
      {
        applicationNumber: 'VA000002',
        applicant: applicants[1]._id,
        visaType: visaTypes[2]._id,
        destinationCountry: 'Canada',
        purpose: 'Masters Degree',
        status: 'submitted',
        priority: 'urgent',
        fee: 35000,
        paymentStatus: 'paid',
        documents: visaTypes[2].requiredDocuments.map(n => ({ name: n, status: 'pending' })),
        submittedAt: new Date()
      },
      {
        applicationNumber: 'VA000003',
        applicant: applicants[2]._id,
        visaType: visaTypes[1]._id,
        destinationCountry: 'United Arab Emirates',
        purpose: 'Business Meeting',
        status: 'approved',
        priority: 'normal',
        fee: 25000,
        paymentStatus: 'paid',
        documents: visaTypes[1].requiredDocuments.map(n => ({ name: n, status: 'verified' })),
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        decidedAt: new Date()
      }
    ]);

    console.log('✅ Visa system seed data created!');
    console.log('');
    console.log('Login credentials:');
    console.log('  Admin → admin@visa.com / admin123');
    console.log('  Agent → agent@visa.com / agent123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
