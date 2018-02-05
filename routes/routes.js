var express = require('express');
var router = express.Router();

const sendIndex = (req, res) => res.sendFile(global.appRoot + '/public/index.html');

router.get('/projects/*', sendIndex);
router.get('/contact', sendIndex);
router.get('/presskits', sendIndex);
router.get('/privacy/encircle2', sendIndex);
router.get('/cloak', function(req, res, next) {
  res.sendFile(global.appRoot + '/public/cloak.html');
});
router.get('/projects', function(req, res, next) {
  res.redirect(req.protocol + '://' + req.get('host') + '/projects/web');
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

module.exports = router;