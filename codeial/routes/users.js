const express = require('express');
const router = express.Router();


const usersController = require('../controller/users_controller.js');




router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

router.get('/', (req, res) => {
    res.send('Please login to view profile or sign up to create a new account');
});






module.exports = router;