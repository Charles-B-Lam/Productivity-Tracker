// dot env is a package that loads environment var's from the .env package into the process.env object
// available to us globally in a node.js environment
require('dotenv').config() 
const express = require('express');
const bodyParser = require('body-parser');

// use mongoose to interact with data in the db
const mongoose = require('mongoose');

// including the models 
const Task = require("./models/task")
const Time = require("./models/time")
const todosRoutes = require('./routes/todos-routes');
const timesRoutes = require('./routes/times-routes');


const app = express();

// CONNECT to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to the db")) // returns a promise so we can use the "then" method to run the callback function (makes sure we are connected to the database)
  .then(result => app.listen(process.env.PORT)) // listen to port 3000 and returns us an instance of the server (line 12).
  .catch(err => console.log(err));

// middleware
app.use(express.json()); // specify it before your routes!!! (critical step)

// mongoose and mongo sandbox routes
// attach this to url http://localhost:4000/ in order to use the API
app.use('/api/todos', todosRoutes); 
app.use('/api/times', timesRoutes)

/* 

app.use('/api/todos', todosRoutes); // => /api/places...

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5050);*/

// middleware 
// (any code that executes between us getting a request from server & us sending a response)
// app.use((req, res, next) => { // this is global middleware
//   console.log(req.path, req.method)
//   next()
// })

// when handling a post or patch request where we're sending data to the server
// because if we want to add a new time/todo item to the database we have to 
// send the data for that time/todo document. We can access that from the request 
// object only if we use a bit of middleware


// first arg is what path or url you want to listen to
// second arg is the callback function that accepts a req (information about url, get, post method) and res (used to send a response)
app.get('/', (req, res) => { 
  // infers the type of content that we are trying to send to the browser and it automatically sets the content-type header
  res.json({mssg: 'Hello Hompage using express'}); // similar to res.write & res.end. Also infers the status code.
})