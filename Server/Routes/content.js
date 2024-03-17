const express = require('express')
const router = express.Router() 

const contentController = require('../Controllers/content')

/* GET: default route */
router.get('/', (req, res, next) => {
    contentController.index(req, res, next)
})