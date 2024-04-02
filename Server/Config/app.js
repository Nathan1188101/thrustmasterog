// required node modules
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy

let dotenv = require('dotenv').config()

// Routing modules
const indexRouter = require('../Routes')
const authRouter = require('../Routes/auth')
const contentRouter = require('../Routes/content')

const app = express();

//link to .env file if not in production mode
if(process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}

//db set up and connection
mongoose.connect(process.env.DB_CONNECTION)
.then((res) => {console.log('Connected to MongoDB')})
.catch((err) => {console.log(`Connection to db failed: ${err}`)})

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'hbs');

// middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//passport config BEFORE routers
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false 
}))

app.use(passport.initialize())
app.use(passport.session()) 

//adding GoogleOAuth setup after initilize and before the routes
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},function(accessToken, refreshToken, profile, done)
{                 //finding or creating based on google id (what we are comparing with in the db to what user in logging in with)
User.findOrCreate({'google.id': profile.id}, {
      username: profile.emails[0].value, // because more than one email can be associated with a google account, it's contained in an array and we are taking the first email in that array at index 0
      'google.id': profile.id, 
      'google.token': accessToken,
      'google.email': profile.emails[0].value, //same here as mentioned above
      'google.name': profile.displayName
    },function(err, user){
      return done(err, user)
    })
  }
))

//link passport to User
const User = require('../Models/user')
passport.use(User.createStrategy())

//have to handle user session with google credentials 
passport.serializeUser((user, done) => { //saving the user's id in the session
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user) //deserialize is fetching the user from the db for each request using the id in the session 
})

//link User model w/passport session mgmt
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/content', contentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: `Error: ${err.status}`, page: 'error'});
});

module.exports = app;