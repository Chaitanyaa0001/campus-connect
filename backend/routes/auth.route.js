const express = require('express');
const { register, login, logout, googleLogin } = require('../Controllers/auth.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post("/google",googleLogin);

module.exports = router;