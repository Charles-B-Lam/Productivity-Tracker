const express = require('express');

const todosControllers = require('../controllers/todos-controllers');

const router = express.Router();

router.get('/:pid', todosControllers.getTodoById);

router.post('/', todosControllers.createTodo);

router.patch('/:pid', todosControllers.updateTodo);

router.delete('/:pid', todosControllers.deleteTodo);

module.exports = router;