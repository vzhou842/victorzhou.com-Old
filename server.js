const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const minify = require('express-minify');

const routes = require('./routes/routes');
const sendemail = require('./routes/sendemail');
const encircle2 = require('./encircle2/routes');

global.appRoot = path.resolve(__dirname);

const app = express();

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

// Start HTTP server
const port = process.env.PORT || '3000';
app.listen(port);
console.log(`Worker listening on port ${port}`);

module.exports = app;
