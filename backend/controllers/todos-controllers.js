const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Todo = require('../models/task');

  /*
    get todo api call
  */
  const getAllTodosById = async (req, res, next) => {
    let todo;
    try {
      todo = await Todo.find({}).sort({createdAt: -1});
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
  
    res.status(200).json(todo);
  };

  const getTodoById = async (req, res, next) => {
    const todoId = req.params.pid; 
    let todo;
    try {
      todo = await Todo.find(todoId);
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
  
    res.json({ todo: todo.toObject({ getters: true }) });
  };


  /*
    update todo api call
  */
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
  
  /*
    update todo api call
  */
  const updateTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
  
    const { status, text, start, end, priority } = req.body;
    const todoId = req.params.pid;
  
    let todo;
    try {
      todo = await Todo.findById(todoId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
  
    todo.text = text;
    todo.status = status;
    todo.start = start;
    todo.end = end;
    todo.priority = priority;
  
    try {
      await todo.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ todo: todo.toObject({ getters: true }) });
  };

  /*
    Delete todo api call
  */
  const deleteTodo = async (req, res, next) => {
    const todoId = req.params.pid;
  
    let place;
    try {
      todo = await Todo.findById(todoId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete place.',
        500
      );
      return next(error);
    }
  
    try {
      await todo.remove();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete place.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted todo.' });
  };

  // export all api calls
  exports.getAllTodosById = getAllTodosById;
  exports.getTodoById = getTodoById;
  exports.createTodo = createTodo;
  exports.updateTodo = updateTodo;
  exports.deleteTodo = deleteTodo;