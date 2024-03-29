const express = require('express');
const dotenv = require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // Add express-session
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy.js');
const passportJWT = require('./config/passport_jwt_strategy.js');
const passportGoogle = require('./config/passport-google-oauth2-strategy.js');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {autoRetry: true, maxRetries:3}); // Twilio package for sending SMS
const nodemailer = require('nodemailer'); // Nodemailer package for sending emails
const cors = require('cors'); // CORS package for cross origin requests
const app = express();
const port = 4000;
const db = require('./config/mongoose.js');
const MongoStore = require('connect-mongo')(session); //this MongoStore is working only in -v3 in my code(use this command => npm i connect-mongo@3)
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMiddleware = require('./config/middleware.js');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket.js').chatSockets(chatServer);
chatServer.listen(5000);

app.use(cors({ origin: 'http://localhost:4000' }));// Allow requests from localhost:4000



app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle: 'expanded',
    prefix: '/css'
}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));    // make the uploads path available to the browser
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// Add express-session middleware
// MongoStore is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    secret: 'blashsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, (err) => {
        console.log(err || 'connect-mongodb setup ok'); // eslint-disable-line no-console
    })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddleware.setFlash);


// all routes are in index.js
// we route '/' to index.js and then index.js routes to other routes like users.js, posts.js, comments.js etc
app.use('/', require('./routes/index.js'));
// app.use('/testing', require('./routes/testing.js')); // these are just for testing and can be removed
// app.use('/users', require('./routes/users.js'));  //all there routes are in index.js

app.listen(port, (err) => {
    if (err) {
        console.log('Server is down!', err);
    }
    console.log(`Server is running on port ${port}`);
});


// twilio.messages
//   .create({
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//     to: '+918684934444', // Text your number
//     from: process.env.TWILIO_NUMBER, // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));