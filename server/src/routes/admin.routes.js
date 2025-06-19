const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { addEmployee, updateEmployee, deleteEmployee, getAllEmployees } = require('../controllers/admin.controller');
const { upload } = require('../services/cloudinary');

router.post('/', authMiddleware(['admin', 'hr']), upload.single('profileImage'), addEmployee);
router.put('/:id', authMiddleware(['admin', 'hr']), upload.single('profileImage'), updateEmployee);
router.delete('/:id', authMiddleware(['admin']), deleteEmployee);
router.get('/', authMiddleware(['admin', 'hr']), getAllEmployees);

 module.exports = router