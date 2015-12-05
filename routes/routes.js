var express = require('express');
var router = express.Router();

router.get('/projects', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/projects.html');
});
router.get('/contact', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/contact.html');
});
router.get('/presskits', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/presskits.html');
});
router.get('/cloak', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/cloak.html');
});
router.get('/privacy/encircle2', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/privacy-encircle2.html');
});

module.exports = router;