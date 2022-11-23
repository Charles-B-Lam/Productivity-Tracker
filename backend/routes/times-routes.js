const express = require('express');

const timesControllers = require('../controllers/times-controllers');

// able to attach the request handlers to router instead of app (this is a mini-app)
const router = express.Router();

// gets all the times in the document
router.get('/', timesControllers.getAllTimes)

// get a single time
router.get('/:id', timesControllers.getTimeById);

// creates a new time
router.post('/', timesControllers.createTime);

// deletes a single time
router.delete('/:id', timesControllers.deleteTime);

// update a time
router.patch('/:id', timesControllers.updateTime);

module.exports = router;