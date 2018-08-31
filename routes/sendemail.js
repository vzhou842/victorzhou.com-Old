var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

if (!process.env.VZ_EMAIL_PASS) {
  console.error('VZ_EMAIL_PASS env var not supplied!');
}

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'omgvictory@gmail.com',
    pass: process.env.VZ_EMAIL_PASS,
  }
});

/* POST sendemail */
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: name, // sender address
    to: 'vzhou842@gmail.com', // list of receivers
    subject: 'Victorzhou.com Contact Submission', // Subject line
    text: 'name: ' + name + '\nemail: ' + email + '\nmessage: ' + message // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error){
      console.error(error);
      res.status(500).end();
      return;
    }
    console.log('Email sent: ' + info.response);
    res.status(200).end();
  });
});

module.exports = router;
