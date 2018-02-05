var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cluster = require('cluster');
var compress = require('compression');
var minify = require('express-minify');
var os = require('os');
var path = require('path');

global.appRoot = path.resolve(__dirname);

var WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;
if (cluster.isMaster) {
    for (var i = 0; i < WORKERS; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

    return;
}

var routes = require('./routes/routes');
var sendemail = require('./routes/sendemail');
var encircle2 = require('./encircle2/routes');

var app = express();

app.set('view engine', 'jade');

app.use(compress());
app.use(minify());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { maxage: '14d' }));
app.use('/bower_components',  express.static(__dirname + '/bower_components', { maxage: '7d' }));

app.use('/', routes);
app.use('/sendemail', sendemail);
app.use('/encircle2', encircle2);

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
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

//start listening
var port = process.env.PORT || '3000';
app.listen(port);
console.log('Worker listening on port ' + port);

module.exports = app;