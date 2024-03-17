const passport = require('passport')
const User = require('../Models/user')

let isAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/auth/login')
    }
    return next()
}

module.exports = isAuthenticated