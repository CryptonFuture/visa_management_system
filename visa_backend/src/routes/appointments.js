const express = require('express');
const router = express.Router();
const { getAll, create, updateStatus } = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAll).post(create);
router.patch('/:id/status', updateStatus);

module.exports = router;
