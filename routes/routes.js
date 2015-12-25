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
router.get('/iOS', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects#iOS');
});
router.get('/Android', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects#Android');
});
router.get('/Web', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects#Web');
});
router.get('/Research', function(req, res, next) {
	res.redirect(req.protocol + '://' + req.get('host') + '/projects#Research');
})

module.exports = router;