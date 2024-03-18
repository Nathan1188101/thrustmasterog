const express = require('express')
const router = express.Router() 

//global auth check middleware built
let authCheck = require('../Config/authCheck')
const contentController = require('../Controllers/content')

/* GET: default route */
router.get('/', (req, res, next) => {
    contentController.index(req, res, next)
})

router.get('/delete/:_id', authCheck, (req, res, next) => {
    contentController.deleteContent(req, res, next)
})

router.get('/create', authCheck, (req, res, next) => {
    contentController.displayCreateForm(req, res, next) 
})

router.post('/create', authCheck, (req, res, next) => {
    contentController.createContent(req, res, next) 
})

router.get('/edit/:_id', authCheck, (req, res, next) => {
    contentController.displayEditForm(req, res, next)
})

router.post('/edit/:_id', authCheck, (req, res, next) => {
    contentController.updateContent(req, res, next) 
})

module.exports = router 