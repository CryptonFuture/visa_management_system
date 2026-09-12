const Appointment = require('../models/Appointment');

exports.getAll = async (req, res) => {
  try {
    const { status, date } = req.query;
    let query = {};
    if (status) query.status = status;
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      query.date = { $gte: d, $lt: next };
    }

    const appointments = await Appointment.find(query)
      .populate('applicant', 'firstName lastName phone')
      .populate('application', 'applicationNumber')
      .populate('createdBy', 'name')
      .sort({ date: 1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const count = await Appointment.countDocuments();
    const appointmentNumber = `APT${String(count + 1).padStart(5, '0')}`;

    const appointment = await Appointment.create({
      ...req.body,
      appointmentNumber,
      createdBy: req.user._id
    });

    const populated = await Appointment.findById(appointment._id)
      .populate('applicant', 'firstName lastName')
      .populate('application', 'applicationNumber');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    ).populate('applicant', 'firstName lastName');

    if (!appointment) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
