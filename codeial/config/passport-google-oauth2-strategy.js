const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// const env = require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/users/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile ,done){
        // find a user using profile.emails[0].value
        let user = await User.findOne({email: profile.emails[0].value})
            console.log(profile)
            // if found, set this user as req.user  
            if (user){
                return done(null, user)
            }
            // if not found, create the user and set it as req.user
            else{
                password = crypto.randomBytes(20).toString('hex'),
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: password,
                    confirm_password: password,
                    avatar: profile.photos[0].value,
                })
                .then((user)=>{
                    return done(null, user)
                })
            }
        // })
    }
))


module.exports= passport;