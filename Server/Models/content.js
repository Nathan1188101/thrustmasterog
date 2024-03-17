const mongoose = require('mongoose')

let contentSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true 
    }

})

let Content = mongoose.model('Content', contentSchema)
module.exports = Content