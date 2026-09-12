const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/visaTypeController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAll).post(authorize('admin', 'agent'), create);
router.route('/:id').put(authorize('admin'), update).delete(authorize('admin'), remove);

module.exports = router;
