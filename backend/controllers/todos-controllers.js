const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Todo = require('../models/task');

let DUMMY_TODOS = [
    {
      id: 'p1',
      text: 'Homework',
      status: 'In progress',
      start: '11/20/2022',
      end: '11/28/2022',
      priority: 'Low'
    }
  ];

// const getTodoById = (req, res, next) => {
//     const todoId = req.params.pid; // { pid: 'p1' }
  
//     const todo = DUMMY_TODOS.find(p => {
//       return p.id === todoId;
//     });
  
//     if (!todo) {
//       throw new HttpError('Could not find a todo for the provided id.', 404);
//     }
  
//     res.json({ todo }); 
//   };

  const getTodoById = async (req, res, next) => {
    const todoId = req.params.pid; 
    let todo;
    try {
      todo = await Todo.findById(todoId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a place.',
        500
      );
      return next(error);
    }
  
    if (!todo) {
      const error = new HttpError(
        'Could not find a place for the provided id.',
        404
      );
      return next(error);
    }
  
    res.json({ todo: todo.toObject({ getters: true }) }); // => { place } => { place: place }
  };

  // const createTodo = (req, res, next) => {
  //   const { text, status, start, end, priority } = req.body;
  //   const createdTodo = {
  //     id: uuid(),
  //     text,
  //     status,
  //     start,
  //     end,
  //     priority
  //   };
  
  //   DUMMY_TODOS.push( createdTodo ); 
  
  //   res.status(201).json({ todo: createdTodo });
  // };

  const createTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { status, text, start, end, priority } = req.body;
  
    const createdTodo = new Todo({
          status,
          text,
          start,
          end,
          priority
        });
  
    try {
      await createdTodo.save(); // save the new Place in the db; save creates the unique place id
    } catch (err) {
      const error = new HttpError(
        'Creating place failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({ todo: createdTodo });
  };
  

  const updateTodo = (req, res, next) => {
    const { text, status, start, end, priority } = req.body;
    const todoId = req.params.pid;
  
    const updatedTodo = { ...DUMMY_TODOS.find(p => p.id === todoId) };
    const todoIndex = DUMMY_TODOS.findIndex(p => p.id === todoId);
    updatedTodo.text = text;
    updatedTodo.status = status;
    updatedTodo.start = start;
    updatedTodo.end = end;
    updatedTodo.priority = priority;
  
    DUMMY_TODOS[todoIndex] = updatedTodo;
  
    res.status(200).json({ todo: updatedTodo });
  };
  
  const deleteTodo = (req, res, next) => {
    const todoId = req.params.pid;
    DUMMY_TODOS = DUMMY_TODOS.filter(p => p.id !== todoId);
    res.status(200).json({ message: 'Deleted todo.' });
  };

  exports.getTodoById = getTodoById;
  exports.createTodo = createTodo;
  exports.updateTodo = updateTodo;
  exports.deleteTodo = deleteTodo;