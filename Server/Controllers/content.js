let Content = require('../Models/content')

let index = async (req, res, next) => {

    //fetching all Content objects in db
    let content = await Content.find()

    console.log(content)
    res.render('content/index', {
        title: 'Content Library',
        content: content 
    })

}

module.exports = {
    index
}