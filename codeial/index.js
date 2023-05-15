const express = require('express');
const app = express();
const port = 3000;


// we are using express router
app.use('/', require('./routes/index.js'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, (err) => {
    if (err) {
        console.log('server is down !', err);
    }
    console.log(`server is running on port ${port}`);
});