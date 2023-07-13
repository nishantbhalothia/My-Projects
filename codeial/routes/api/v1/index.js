const express = require('express');
const router = express.Router();

console.log('Api V1 index Route got kiccked in')


// router.use('/users', require('./users.js'));
router.use('/posts', require('./posts'));
// router.use('/comments', require('./comments.js'));


module.exports = router;