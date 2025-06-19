const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { applyLeave, updateLeaveStatus, getLeaveHistory, getLeaveBalance } = require('../controllers/leave.controller');



//  app.use('/api/leave', leaveRoutes);
router.post('/', authMiddleware(['employee', 'hr', 'admin']), applyLeave);
router.put('/:id', authMiddleware(['hr', 'admin']), updateLeaveStatus);
router.get('/', authMiddleware(['employee', 'hr', 'admin']), getLeaveHistory);
router.get('/balance', authMiddleware(['employee', 'hr', 'admin']), getLeaveBalance);

module.exports = router;