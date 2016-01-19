var express = require('express');
var router = express.Router();

router.get('/projects/*', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/index.html');
});
router.get('/contact', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/index.html');
});
router.get('/presskits', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/index.html');
});
router.get('/cloak', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/cloak.html');
});
router.get('/privacy/encircle2', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/index.html');
});
router.get('/iOS', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects/iOS');
});
router.get('/Android', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects/Android');
});
router.get('/web', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects/web');
});
router.get('/research', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects/research');
});

module.exports = router;