
const Todo = require('../models/todo.js')

module.exports.getTodo =async (req, res) => {
    let todos =await Todo.find({})
    res.render('home.ejs',{
        title: "Home Page",
        todos: todos
    });
}




module.exports.createTodo = async(req, res) => {
    await Todo.create({
        task: req.body.task,
        date: req.body.date
    });
    return res.redirect('back');
}


module.exports.deleteTodo = async(req, res) => {
    let id = req.query.id;
    let todoId = await Todo.findByIdAndDelete(id);
    return res.redirect('back')
}

