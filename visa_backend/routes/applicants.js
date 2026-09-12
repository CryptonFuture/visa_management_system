const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/applicantController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne).put(update).delete(authorize('admin'), remove);

module.exports = router;
