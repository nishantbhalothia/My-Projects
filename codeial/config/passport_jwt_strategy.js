const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; // ExtractJWT is used to extract the jwt from the header

const User = require('../models/user.js');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // ExtractJWT is used to extract the jwt from the header and we are using the bearer token
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function(err, user) {
        if (err) {
            console.log('Error in finding user from JWT');
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}
));


module.exports = passport;