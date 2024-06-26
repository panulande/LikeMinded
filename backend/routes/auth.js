const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth');

router.get('/', authControllers.getSignupLogin);


router.post('/signup', authControllers.postSignup);

router.get('/auth/:token', authControllers.getAuthToken);

module.exports = router;