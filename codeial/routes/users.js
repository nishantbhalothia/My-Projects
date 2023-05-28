const express = require('express');
const router = express.Router();


const usersController = require('../controller/users_controller.js');
const userSignUpController = require('../controller/signup_controller.js');

router.get('/sign-up', userSignUpController.signUp);
router.get('/profile', usersController.profile);
router.get('/', (req, res) => {
    res.send('Please login to view profile or sign up to create a new account');
 });






module.exports = router;