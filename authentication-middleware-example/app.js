var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter   = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  keys: ["my_best_secret"],
  maxAge: 30 * 60 * 1000 // 30 minutes
}))

// Auth middleware
app.use(function (req, res, next) {
  if(req.method == 'POST'){
    const userName = req.body.userName
    if(userName){
      req.session.userName = userName;
      res.redirect('/')
    }
  }

  next()
});

app.use(function(req, res, next){
  if(req.method == "GET" && !req.url.includes("login") && !req.url.includes("api") && !req.session.userName){
    req.url = "/login"
  }

  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
