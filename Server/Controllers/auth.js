// User model for Auth
let User = require('../Models/user')
let passport = require('passport')

//display register form function 
let displayRegisterForm = (req, res, next) => {
    let messages = req.session.messages || []
    req.session.messages = []

    res.render('auth/register', { title: 'Register' });

    res.render('auth/register', {
        title: 'Register',
        messages: messages 
    })
}

//display login form function
let displayLoginForm = (req, res, next) => {

    let messages = ''

    if(req.params.invalid){
        messages = 'Invalid Login'
    }

    res.render('auth/login', { title: 'Login', messages: messages })
}

//submit register function 
let submitRegister = (req, res, next) => {

    User.register(new User({username: req.body.username}), req.body.password, (err, newUser) => {
        if(err){
            return res.render('auth/register', {messages: err})
        }
        else{
            req.login(newUser, (err) => {
                res.redirect('/content')
            })
        }
    })

}

//submitting login function 
let submitLogin = (req, res , next) => {
    //basically handing it over to passport here to deal with these parts 
    passport.authenticate('local', (err, user) => {
        if(err){
            return res.redirect('/auth/login/invalid')
        }
        else{
            req.login(user, (err) => {
                if(user){
                    return res.redirect('/content')
                }
                return res.redirect('/auth/login/invalid')
            })
            
        }
    })(req, res, next) 
}

let logout = (req, res, next) => {
    req.logout((err) => {
        return res.redirect('/')
    })
}

// make public
module.exports = {
    displayRegisterForm,
    displayLoginForm,
    submitRegister,
    submitLogin,
    logout
}



