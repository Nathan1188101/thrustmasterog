const express = require('express')
const passport = require('passport')
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

router.get('/login/:invalid', (req, res, next) => {
    authController.submitLogin(req, res, next) 
})

/* GET: /auth/login => logout */
router.get('/logout', (req, res, next) => {
    authController.logout(req, res, next)
})

//google auth routes 
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] 
}))

// Callback route for Google to redirect to
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login/invalid' }), //if authentication fails 
    function(req, res) {
        // Successful authentication, redirect to main page
        res.redirect('/')
    }
)

module.exports = router
