const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { addEmployee, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeProfile } = require('../controllers/employee.controller');
const { upload } = require('../services/cloudinary');

router.post('/', authMiddleware(['admin', 'hr']), upload.single('profilePicture'), addEmployee);
router.put('/:id', authMiddleware(['admin', 'hr']), upload.single('profilePicture'), updateEmployee);
router.delete('/:id', authMiddleware(['admin']), deleteEmployee);
router.get('/', authMiddleware(['admin', 'hr']), getAllEmployees);
router.get('/profile', authMiddleware(['employee', 'hr', 'admin']), getEmployeeProfile);

module.exports = router;