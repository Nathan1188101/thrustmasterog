const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')


// define schema for Media object
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 8
    },
    google: { //extending user model for google user info 
        id: String, 
        token: String,
        email: String, 
        name: String 
    }
});

//schema plugins
userSchema.plugin(plm) //need this for the createStrategy() method that we called in the app.js in Config folder 
userSchema.plugin(findOrCreate) //need this for google oauth strategy 

let User = mongoose.model('User', userSchema);
module.exports = User;


  