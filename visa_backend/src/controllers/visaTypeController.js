const VisaType = require('../models/VisaType');

exports.getAll = async (req, res) => {
  try {
    const types = await VisaType.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const type = await VisaType.create(req.body);
    res.status(201).json({ success: true, data: type });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const type = await VisaType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!type) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: type });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await VisaType.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Visa type deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
