const express = require('express');
const router = express.Router();


const homeController = require('../controller/home_controller.js')


// home is a function we export from home_controller.js in controller folder
router.get('/', homeController.home);

module.exports = router;