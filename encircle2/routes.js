var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// CONNECT TO MONGOLAB MONGODB DATABASE
mongoose.connect(process.env.ENCIRCLE2_MONGODB_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db opened');
});

module.exports = router;