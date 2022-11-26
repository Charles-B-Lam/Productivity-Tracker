const Time = require('../models/time');
const mongoose = require('mongoose')

const getAllTimes = async (req, res, next) => {
    // res.json({mssg: 'GET all times'}); // testing if request executed
    // finds all the gets us all the documents inside the times collection
    const times = await Time.find({}).sort({createdAt: -1}) 
    res.status(200).json(times) // the response is the array of time objects
};

const getTimeById = async (req, res, next) => {
    // res.json({mssg: 'GET a single time'}) // testing if request executed
    // getting the id from the route parameter
    const {id} = req.params // all route params are stored on a params property

    // make sure the id is a string of 12 bytes or a string of 24 hex characters
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Time"})
    }
    
    // method provided to filter and find the object with the specific id
    const time = await Time.findById(id) 

    if (!time) {
        return res.status(404).json({error: "No Such Time"})
    } // if

    res.status(200).json(time) // the response is the found time object with the specific id
};

const createTime = async (req, res, next) => {
    // when we send a post request we'll send out the data that we want to 
    // create a document with so we'd send the title we'd send the time property.
    // Because we used the middleware, expresss.json, all of that request body that
    // comes along with the request is going to be passed onto the request object so we can use it
    const {title, time} = req.body;
    // res.json({mssg: 'POST a single time'}) // testing if request executed

    // add doc to db
    try {
        // USING TIME MODEL TO CREATE A TIME DOCUMENT(data)
        // when we create a new document once that's been created the response
        // we get is the new document that was just created along with the id of that document
        const data = await Time.create({title, time}); // this is an async function so we need to declare async for the entire function
        res.status(200).json(data) // returning the created object

        //await createdTime.save(); // save the new Place in the db; save creates the unique place id
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};
  

const updateTime = async (req, res, next) => {
    // res.json({mssg: 'UPDATE a single time'}) // testing if request executed

    // getting the id from the route parameter
    const {id} = req.params // all route params are stored on a params property

    // make sure the id is a string of 12 bytes or a string of 24 hex characters
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Time"})
    } // if

    // updating the title or the time
    const time = await Time.findOneAndUpdate({_id: id}, { 
        ...req.body // spreading the properties of the object
    })

    if (!time) {
        return res.status(404).json({error: "No Such Time"})
    } // if

    res.status(200).json(time)
   
}; // updated Time
  
const deleteTime = async (req, res, next) => {
    // res.json({mssg: 'DELETE a single time'}) // testing if request executed

    // getting the id from the route parameter
    const {id} = req.params // all route params are stored on a params property

    // make sure the id is a string of 12 bytes or a string of 24 hex characters
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Time"})
    } // if

    // use the mongoose findOneAndDelete function
    const time = await Time.findOneAndDelete({_id: id})

    if (!time) {
        return res.status(404).json({error: "No Such Time"})
    } // if

    res.status(200).json(time)
}; // deleteTime

  exports.getAllTimes = getAllTimes;
  exports.getTimeById = getTimeById;
  exports.createTime = createTime;
  exports.updateTime = updateTime;
  exports.deleteTime = deleteTime;