 /*
This is the routes file for the user login and signup
Those routes reference the controller function to handle the request
The controller process the request and send a response to the browswer
We register the user route in the app.js
*/
const express = require('express')

const router = express.Router()

//controller functions
const {signupUser, loginUser} = require('../controllers/userController')

//They both gonna be post request because we will be sending the email and password
// to the server 
//login route
router.post('/login', loginUser) //inside is the controller

//signup route
router.post('/signup', signupUser)

module.exports = router