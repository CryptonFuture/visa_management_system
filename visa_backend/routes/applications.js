const express = require('express');
const router = express.Router();
const {
  getAll, getOne, create, updateStatus, updateDocument
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne);
router.patch('/:id/status', updateStatus);
router.patch('/:id/document', updateDocument);

module.exports = router;
