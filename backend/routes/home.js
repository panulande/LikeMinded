const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/home')

router.get('/home', homeControllers.getHome);

module.exports = router;