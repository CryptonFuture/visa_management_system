const Applicant = require('../models/Applicant');

exports.getAll = async (req, res) => {
  try {
    const { search, nationality } = req.query;
    let query = {};
    if (nationality) query.nationality = nationality;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { passportNumber: { $regex: search, $options: 'i' } },
        { applicantId: { $regex: search, $options: 'i' } }
      ];
    }
    const applicants = await Applicant.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: applicants.length, data: applicants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: applicant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const count = await Applicant.countDocuments();
    const applicantId = `APP${String(count + 1).padStart(5, '0')}`;
    const applicant = await Applicant.create({ ...req.body, applicantId });
    res.status(201).json({ success: true, data: applicant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!applicant) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: applicant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Applicant.findByIdAndUpdate(req.params.id, { status: 'inactive' });
    res.json({ success: true, message: 'Applicant deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
