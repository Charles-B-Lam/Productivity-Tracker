const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//here we will use jsonwebtoken. We use json web token because want the front end
// to keep a track that the user is authenicated 

//Here the function will create and generate a token
// that can be reuse for the login and signup function
const createToken = (_id) =>{
    //first argument is an object that represent a payload of the token. 
    // the Different property and values are going to be inside the payload
    //seond arg is is secret string only known to the server. Secret string is in .env varable
    //third arg is option, which we used expired. It meain the user will be logged in for 3 days
    //then the token will be expired
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
}

//This is the controller for the login 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        
        //create a token
        const token = createToken(user._id)
        //as respond, we send back the email and token. we can find in postman or local storage
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//This is the controller for signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    //document that will be send back
    try{
        const user = await User.signup(email, password)
        
        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}