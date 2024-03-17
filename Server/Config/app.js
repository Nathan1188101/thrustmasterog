// required node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

let dotenv = require('dotenv').config()

// Routing modules
const indexRouter = require('../Routes')
const authRouter = require('../Routes/auth')
const contentRouter = require('../Routes/content')

const app = express();

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

//link passport to User
const User = require('../Models/user')
passport.use(User.createStrategy())

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