const express = require('express');
const router = express.Router();

// import the index controller
const IndexController = require('../Controllers/index');

/* GET Default Route */
router.get('/', (req, res, next)=>
{
    IndexController.DisplayHome(req, res, next);
});

/* GET Home Page */
router.get('/home', (req, res, next)=>
{
    IndexController.DisplayHome(req, res, next);
});

module.exports = router;
