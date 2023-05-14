const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller.js')

router.get('/', homeController.home);
router.use('/users', require('./users.js'));
// router.get('/', (req, res) => {});

module.exports = router;