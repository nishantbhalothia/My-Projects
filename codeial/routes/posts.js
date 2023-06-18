const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controller/posts_controller')

router.post('/create',passport.checkAuthentication, postsController.create);
router.post('/destroy/:id',passport.checkAuthentication, postsController.destroy);

module.exports = router;