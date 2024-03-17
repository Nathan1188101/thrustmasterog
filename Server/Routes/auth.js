const express = require('express')
const router = express.Router() 

//auth controller
const authController = require('../Controllers/auth')

/* GET: /auth/register => display register form*/
router.get('/register', (req, res, next) => {
    authController.displayRegisterForm(req, res, next)
})

/* GET: /auth/login => display login form */
router.get('/login', (req, res, next) => {
    authController.displayLoginForm(req, res, next)
})

/* POST /auth/register => process registration attempt */
router.post('/register', (req, res, next) => {
    authController.submitRegister(req, res, next)
})

/* POST /auth/login => process login attempt */
router.post('/login', (req, res, next) => {
    authController.submitLogin(req, res, next) 
})

module.exports = router
