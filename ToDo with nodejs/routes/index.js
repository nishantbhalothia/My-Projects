const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodo);
router.post('/create-todo', todoController.createTodo);
router.get('/delete-todo', todoController.deleteTodo);



module.exports = router;