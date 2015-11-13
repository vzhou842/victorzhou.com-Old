var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'wwwvictorzhoucom@gmail.com',
        pass: 'wwwvictorzhoucompassword'
    }
});

/* POST sendemail */
router.post('/', function(req, res, next) {
	var name = req.param('name');
	var email = req.param('email');
	var message = req.param('message');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: name, // sender address
	    to: 'vzhou842@gmail.com', // list of receivers
	    subject: 'Victorzhou.com Contact Submission', // Subject line
	    text: 'name: ' + name + '\nemail: ' + email + '\nmessage: ' + message // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.status(500);
	        return;
	    }
	    console.log('Message sent: ' + info.response);
	    res.status(200);
	});
});

module.exports = router;
