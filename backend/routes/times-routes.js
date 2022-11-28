const express = require('express');

const timesControllers = require('../controllers/times-controllers');

const requireAuth = require('../middleware/requireAuth')

// able to attach the request handlers to router instead of app (this is a mini-app)
const router = express.Router();

//This gonna protect it and be able to use only if user is authenicated
//must be authenicated to be able to use below controller
router.use(requireAuth)

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