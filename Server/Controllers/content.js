let Content = require('../Models/content')

let index = async (req, res, next) => {

    //fetching all Content objects in db
    let content = await Content.find()

    console.log(content)
    res.render('content/index', {
        title: 'Content Library',
        content: content,
        user: req.user
    })

}

let deleteContent = async (req, res, next) => {

    await Content.findByIdAndDelete(req.params._id)

    res.redirect('/content')

}

module.exports = {
    index,
    deleteContent
}