const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth');

router.get('/signup', authControllers.getSignup);
router.get('/login', authControllers.getLogin);

module.exports = router;