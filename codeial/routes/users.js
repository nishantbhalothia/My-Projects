const express = require('express');
const router = express.Router();
const passport = require('passport')


const usersController = require('../controller/users_controller.js');




router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);


// using passport as a middleware to authenticate user
router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}

) ,usersController.createSession);

router.get('/', (req, res) => {
    res.send('Please login to view profile or sign up to create a new account');
});






module.exports = router;