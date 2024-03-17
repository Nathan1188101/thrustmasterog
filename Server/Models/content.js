const mongoose = require('mongoose')

let contentSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true 
    },

})
                                                        //specifying collection on end here
let Content = mongoose.model('Content', contentSchema, 'content')
module.exports = Content