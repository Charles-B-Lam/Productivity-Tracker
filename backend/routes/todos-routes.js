const express = require('express');

const todosControllers = require('../controllers/todos-controllers');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//This gonna protect it and be able to use only if user is authenicated
//must be authenicated to be able to use below controller
router.use(requireAuth)


router.get('/', todosControllers.getAllTodosById);

router.get('/:pid', todosControllers.getTodoById);

router.post('/', todosControllers.createTodo);

router.patch('/:pid', todosControllers.updateTodo);

router.delete('/:pid', todosControllers.deleteTodo);

module.exports = router;