const express = require('express');
const router = express.Router();

const testingController = require('../controller/testing_controller.js');

router.get('/', testingController.testing);

module.exports = router;
