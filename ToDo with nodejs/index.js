const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/mongoose.js');
const Todo = require('./models/todo.js');
const app = express();


app.set('view engine', 'ejs');
// app.set('views', './views');
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("assets"));

// ========================================================
// midleware for home page
// ========================================================
app.use('/', require('./routes/index.js'));
// app.get('/',async function(req, res){
//     let todos = await Todo.find({ })
//     return res.render('home', {
//         title: "My Todo List",
//         todos: todos
//     });
// })

// ========================================================
// creatin a todo list
// ======================================================== 
// app.post('/create-todo', (req, res) => {
//     Todo.create({
//         task: req.body.task,
//         date: req.body.date
//     });
//     return res.redirect('back');
// });


// ========================================================
// deleting a todo list through get request using query
// ========================================================
// app.get('/delete-todo',async (req, res) => {
//     let id = req.query.id;
//     let todoId = await Todo.findByIdAndDelete(id);
//     return res.redirect('back')
// });


// ========================================================
// deleting a todo list through post request using body
// ========================================================
// app.post('/delete-todo',async (req, res) => {
//     let id = req.body.delete;
//     let todoId = await Todo.findByIdAndDelete(id);
//     return res.redirect('back')
// });



app.listen(3000, (err) => {
    if (err) {
        console.log('server is down !', err);
    }
    console.log('server is running on port 3000');
});