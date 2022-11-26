const mongoose = require('mongoose');
const Schema = mongoose.Schema; // getting the schema from the mongoose object (constructor function)

// a schema is the thing that is going to define the structure of the documents 
// that we're gonna later store inside a collection. It's the thing that a model wraps around
const timeSchema = new Schema({ // creates new instance of a schema object
    // the different properties that a blog object might have
    title: {
        type: String,
        required: true // this field is required for blog documents
    },     
    time: {
        type: Number,
        required: true // this field is required for blog documents
    }
}, {timestamps: true}); // second arg = options object

// the model is the thing that surrounds the schema and 
// then provides us with an interface with methods by which to communicate 
// with a database collection for that document type

// this model takes in as a 1st arg = the name of this model 
// it's going to look at this name it's going to pluralize it and then 
// look for that collection inside the database whenever we use this model 
// in the future to communicate with the database
// 2nd arg = the schema that we want to base this model on
const Time = mongoose.model('Time', timeSchema) // it will look for 'Times' collection based on this name

// BETTER EXPLANATION OF MONGOOSE.MODEL
// 1st arg = is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name. 
// Thus, for the example above, the model Tank is for the tanks collection in the database.

// export this model so we can use it elsewhere.
module.exports = Time;