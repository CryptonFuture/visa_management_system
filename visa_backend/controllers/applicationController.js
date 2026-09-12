const Application = require('../models/Application');
const VisaType = require('../models/VisaType');

exports.getAll = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const applications = await Application.find(query)
      .populate('applicant', 'firstName lastName email phone passportNumber nationality applicantId')
      .populate('visaType', 'name code fee durationDays')
      .populate('assignedAgent', 'name')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id)
      .populate('applicant')
      .populate('visaType')
      .populate('assignedAgent', 'name email')
      .populate('createdBy', 'name');
    if (!app) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const visaType = await VisaType.findById(req.body.visaType);
    if (!visaType) return res.status(404).json({ success: false, message: 'Visa type not found' });

    const count = await Application.countDocuments();
    const applicationNumber = `VA${String(count + 1).padStart(6, '0')}`;

    const documents = (visaType.requiredDocuments || []).map(name => ({
      name,
      status: 'pending'
    }));

    const application = await Application.create({
      ...req.body,
      applicationNumber,
      fee: visaType.fee,
      documents,
      createdBy: req.user._id,
      status: req.body.status || 'submitted',
      submittedAt: new Date()
    });

    const populated = await Application.findById(application._id)
      .populate('applicant', 'firstName lastName')
      .populate('visaType', 'name code');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, rejectionReason, notes, paymentStatus } = req.body;
    const update = {};
    if (status) {
      update.status = status;
      if (['approved', 'rejected', 'issued'].includes(status)) {
        update.decidedAt = new Date();
      }
    }
    if (rejectionReason) update.rejectionReason = rejectionReason;
    if (notes !== undefined) update.notes = notes;
    if (paymentStatus) update.paymentStatus = paymentStatus;

    const app = await Application.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate('applicant', 'firstName lastName')
      .populate('visaType', 'name');

    if (!app) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { docIndex, status, notes } = req.body;
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Not found' });

    if (app.documents[docIndex]) {
      if (status) app.documents[docIndex].status = status;
      if (notes !== undefined) app.documents[docIndex].notes = notes;
      await app.save();
    }

    res.json({ success: true, data: app });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
