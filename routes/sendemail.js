var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vzhou842@gmail.com',
        pass: process.env.VZ_EMAIL_PASS,
    }
});

/* POST sendemail */
router.post('/', function(req, res, next) {
	console.log('query: ' + JSON.stringify(req.query) + ' body: ' + JSON.stringify(req.body));
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
	transporter.sendMail(mailOptions, function(error, info){
	    if (error){
	        console.log(error);
	        res.status(500).end();
	        return;
	    }
	    console.log('Message sent: ' + info.response);
	    res.status(200).end();
	});
});

module.exports = router;
