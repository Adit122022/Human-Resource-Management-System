const express = require('express');

const router = express.Router();

const { login, signup, getUsers } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');



//  app.use('/api/auth', auth);
router.post('/signup',signup );
router.post('/login', login);
router.get('/', authMiddleware(["admin","hr"]),getUsers)


 module.exports = router