
const Todo = require('../models/todo.js')

// ========================================================
// rendering home page using Todo model (schema)
// ========================================================
module.exports.getTodo =async (req, res) => {
    let todos =await Todo.find({})
    res.render('home.ejs',{
        title: "Home Page",
        todos: todos
    });
}



// ========================================================
// creatin a todo list
// ======================================================== 
module.exports.createTodo = async(req, res) => {
    await Todo.create({
        task: req.body.task,
        date: req.body.date
    });
    return res.redirect('back');
}


// ========================================================
// deleting a todo list through get request using query
// ========================================================
module.exports.deleteTodo = async(req, res) => {
    let id = req.query.id;
    let todoId = await Todo.findByIdAndDelete(id);
    return res.redirect('back')
}

