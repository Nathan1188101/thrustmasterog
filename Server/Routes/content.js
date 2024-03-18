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

module.exports = router 