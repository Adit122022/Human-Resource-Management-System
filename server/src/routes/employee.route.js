const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getEmployeeProfile } = require('../controllers/employee.controller');

router.get('/profile', authMiddleware(['employee', 'hr', 'admin']), getEmployeeProfile);

module.exports = router;