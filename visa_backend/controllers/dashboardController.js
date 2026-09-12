const Application = require('../models/Application');
const Applicant = require('../models/Applicant');
const Appointment = require('../models/Appointment');
const VisaType = require('../models/VisaType');

exports.getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalApplicants,
      totalApplications,
      pendingApps,
      approvedApps,
      rejectedApps,
      todayAppointments,
      statusBreakdown,
      recentApplications,
      visaTypeStats
    ] = await Promise.all([
      Applicant.countDocuments({ status: 'active' }),
      Application.countDocuments(),
      Application.countDocuments({ status: { $in: ['submitted', 'under_review', 'documents_required'] } }),
      Application.countDocuments({ status: 'approved' }),
      Application.countDocuments({ status: 'rejected' }),
      Appointment.countDocuments({ date: { $gte: today }, status: 'scheduled' }),
      Application.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Application.find()
        .populate('applicant', 'firstName lastName')
        .populate('visaType', 'name')
        .sort({ createdAt: -1 })
        .limit(6),
      Application.aggregate([
        { $group: { _id: '$visaType', count: { $sum: 1 } } },
        { $lookup: { from: 'visatypes', localField: '_id', foreignField: '_id', as: 'type' } },
        { $unwind: '$type' },
        { $project: { name: '$type.name', count: 1 } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalApplicants,
          totalApplications,
          pendingApps,
          approvedApps,
          rejectedApps,
          todayAppointments
        },
        statusBreakdown,
        recentApplications,
        visaTypeStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
