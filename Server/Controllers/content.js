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

let displayCreateForm = async(req, res, next) => {
    let content = await Content.find()

    res.render('content/create',
    {
        title: 'Add New Content',
        content: content,
        user: req.user
    })
}

let createContent = async(req, res, next) => {
    await Content.create(req.body)

    res.redirect('/content')
}

let displayEditForm = async(req, res, next) => {
    let content = await Content.findById(req.params._id)

    res.render('content/edit', {
        title: 'Update',
        content: content,
        user: req.user 
    })
}

let updateContent = async(req, res, next) => {
    
    await Content.findByIdAndUpdate(req.params._id, req.body)

    res.redirect('/content')
}

let deleteContent = async (req, res, next) => {

    await Content.findByIdAndDelete(req.params._id)

    res.redirect('/content')

}

module.exports = {
    index,
    createContent, 
    displayCreateForm, 
    displayEditForm, 
    updateContent, 
    deleteContent
}