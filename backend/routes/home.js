const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const homeControllers = require('../controllers/home')

router.get('/home',isAuth, homeControllers.getHome);

module.exports = router;