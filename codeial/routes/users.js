const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user');
const twilio = require('twilio');

require('dotenv').config();



const usersController = require('../controller/users_controller.js');




router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// for sending otp to user using twilio
// router.post('/send-otp', usersController.sendOtp);


// using passport as a middleware to authenticate user
router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}

) ,usersController.createSession);

router.get('/', (req, res) => {
    res.send('Please login to view profile or sign up to create a new account');
});

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);



module.exports = router;