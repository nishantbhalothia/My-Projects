const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;


app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// we are using express router and this is a middleware
// we send(route) '/' this request to ./routes/indes.js
app.use('/', require('./routes/index.js'));
app.use('/testing' , require('./routes/testing.js'))
app.use('/users', require('./routes/users.js'));


app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, (err) => {
    if (err) {
        console.log('server is down !', err);
    }
    console.log(`server is running on port ${port}`);
});