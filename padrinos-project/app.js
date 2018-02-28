// const config       = require ("./config")
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const multer       = require ('multer');
const axios        = require ('axios');
const session      = require ('express-session');
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");

mongoose.connect('mongodb://localhost/padrinos-project');

const app = express();

const index = require('./routes/index');
const authController = require('./routes/auth');
const viewEvent = require('./routes/events');
const newEvent = require('./routes/events');
const userController = require('./routes/user');
const eventDetils = require('./routes/events')
const makeList = require('./routes/events')

//Session
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use(function(req,res,next){
  res.locals.user = req.user;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
//I added this for layouts
app.set('layout', 'layouts/main-layout');

//Passport config
require('./config/passport')(app);

//Use Routes
app.use('/', index);
app.use('/', authController);
app.use ('/', viewEvent);
app.use('/', newEvent);
app.use('/', userController);
app.use('/', eventDetils);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



