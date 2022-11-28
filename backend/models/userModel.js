//passing the structure of user document when we save them to the database
//Mongose won't let us save to database unless we stick to teh schema below
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')



const Schema = mongoose.Schema

//for unique, if someone already signup with that email, then mongoose won
//allow the email in the database since it already exist
const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method is method you create on your own
//we are trying to hash password before we save them to the database. 
//So we are using bCrypt to hash password. 
//Bcrypt is hashing function that can hash our password in a secure way.
//even if ppl able to get into the database, the password would still be procted.
userSchema.statics.signup = async function(email, password) {
    //validation for email and pw
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    //.isEmail is validator that check if user really entered an email
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    //check if the password user created strong enough
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    
    //checking to see if entered email already existed
    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }

    //salt is random string of character that get added to user password before it get hashed. Add extra security
    //if two people use same password, salt be different. prevent hacker from password matching
    //we do this by generating salt and hashing it with password. and store the hash in DB
    const salt = await bcrypt.genSalt(10) //the longer the number, the longer it take for hacker to crack pw, but also take longer for user to signup
    const hash = await bcrypt.hash(password, salt)

    //take hashing pw with user email and store it in DB
    const user = await this.create({email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    //checking to see if entered email already existed
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }

    //comparing the pw to check if it the same
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)