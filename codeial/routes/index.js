const express = require('express');
const router = express.Router();

console.log('Root index for Routes got kiccked in')


const homeController = require('../controller/home_controller.js')


// home is a function we export from home_controller.js in controller folder
router.get('/', homeController.home);
router.use('/users', require('./users.js'));
router.use('/testing', require('./testing.js'));
router.use('/posts', require('./posts.js'));
router.use('/comments', require('./comments.js'));
router.use('/likes', require('./likes.js'));

// api routes
router.use('/api', require('./api'));

module.exports = router;