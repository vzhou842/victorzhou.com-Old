var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var sendemail = require('./routes/sendemail');

var app = express();

app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/sendemail', sendemail);

app.get('/projects', function(req, res, next) {
  res.sendFile(__dirname + '/public/projects.html');
});
app.get('/contact', function(req, res, next) {
  res.sendFile(__dirname + '/public/contact.html');
});
app.get('/presskits', function(req, res, next) {
  res.sendFile(__dirname + '/public/presskits.html');
});
app.get('/cloak', function(req, res, next) {
  res.sendFile(__dirname + '/public/cloak.html');
});
app.get('/privacy/encircle2', function(req, res, next) {
  res.sendFile(__dirname + '/public/privacy-encircle2.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
