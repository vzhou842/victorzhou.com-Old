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

// Catch 404
app.use((req, res) => {
  res.status(404).sendFile(global.appRoot + '/public/404.html');
});

//start listening
var port = process.env.PORT || '3000';
app.listen(port);
console.log('Worker listening on port ' + port);

module.exports = app;