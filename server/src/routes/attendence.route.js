const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { markAttendance, getAttendanceHistory } = require('../controllers/attendance.controller');

router.post('/', authMiddleware(['employee', 'hr', 'admin']), markAttendance);
router.get('/', authMiddleware(['employee', 'hr', 'admin']), getAttendanceHistory);

module.exports = router;