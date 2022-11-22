const express = require('express');
const bodyParser = require('body-parser');

// use mongoose to interact with data in the db
const mongoose = require('mongoose');

// including the models 
const Task = require("./models/task")
const Time = require("./models/time")

const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://charles:uga2023@react4300project.ky24uzv.mongodb.net/To-Do-List?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((result) => console.log("connected to the db")) // returns a promise so we can use the "then" method to run the callback function (makes sure we are connected to the database)
  .then(result => app.listen(3000)) // listen to port 3000 and returns us an instance of the server (line 12).
  .catch(err => console.log(err));

// first arg is what path or url you want to listen to
// second arg is the callback function that accepts a req (information about url, get, post method) and res (used to send a response)
app.get('/', (req, res) => { 
  // infers the type of content that we are trying to send to the browser and it automatically sets the content-type header
  res.send('<p>Hello Hompage using express</p>'); // similar to res.write & res.end. Also infers the status code.
})


// mongoose and mongo sandbox routes

// CREATE TASK INSTANCE IN DB
// inside what we want to do now is create a new instance of a Task
// and then save that to the Task-List collection in the database
app.get('/add-task', (req, res) => {
  // using the model to create a new instance of a task document within the code.
  const task = new Task({
    // in here we pass an object with the different properties of this task
    status: "good",
    text: "Task (blah)",
    start: "November 21",
    end: "November 22",
    priority: "high",
  }); // we can use a method on this to save it to the database

  // when we save it, we use an instance method on the instance of the singular time we created.
  // asynchronous method
  task.save() // creating the document and then saving to the database (saving the document into the collection)
  .then((result) => {
    res.send(result); // sending back the new document object from the collections in the database from mongoDB not the object we just stored
  })
  .catch((err) => {
    console.log(err);
  });
}) // adding a task to the task-list collection

// GETTING ALL TASKS FROM DB
app.get('/all-tasks', (req, res) => {
// When we find the documents, we use the find method on Task not the single instance of the task
// use the task model to get all the documents from this collection
// async method
Task.find() // gets us all the documents inside the task-list collection
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
})

// GETTING SINGLE TASK FROM THE DB
app.get('/single-task', (req, res) => {
Task.findById() // finding the object based on its ID
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
})


// CREATE TIME INSTANCE IN DB
// inside what we want to do now is create a new instance of a Time
// and then save that to the Times collection in the database
app.get('/add-time', (req, res) => {
  // using the model to create a new instance of a time document within the code.
  const time = new Time({
    // in here we pass an object with the different properties of this time
    title: "time1",
    time: 20
  }); // we can use a method on this to save it to the database

  // when we save it, we use an instance method on the instance of the singular time we created.
  // asynchronous method
  time.save() // creating the document and then saving to the database (saving the document into the collection)
  .then((result) => {
    res.send(result); // sending back the new document object from the collections in the database from mongoDB not the object we just stored
  })
  .catch((err) => {
    console.log(err);
  });
}) // adding a time to the Times collection

// GETTING ALL TIMES FROM DB
app.get('/all-times', (req, res) => {
// When we find the documents, we use the find method on Time not the single instance of the timr
// use the time model to get all the documents from this collection
// async method
Time.find() // gets us all the documents inside the Times collection
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
})

// GETTING SINGLE TASK FROM THE DB
app.get('/single-time', (req, res) => {
Time.findById() // finding the object based on its ID
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
})

// app.use((req, res, next) => {
// res.locals.path = req.path;
// next();
// });

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// });

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error;
//   });
