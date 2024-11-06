// api/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rute untuk login pengguna
router.post('/login', userController.loginUser);

// Rute untuk pendaftaran pengguna
router.post('/register', userController.registerUser);

module.exports = router;
