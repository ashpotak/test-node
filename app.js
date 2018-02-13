var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
 // console.log(req.body)
  res.sendFile(__dirname + '/index.html');

  let transporter = nodemailer.createTransport({
    host: 'mail.best-lviv.org.ua',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'board@best-lviv.org.ua', // generated ethereal user
      pass: 'best2005' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const output = `
    <p>from: ${req.body.mail}</p>
    <h3>Message a</h3>
    <p>${req.body.message}</p>
    `;

  var message = {
    from: 'board@best-lviv.org.ua',
    to: 'alexandr.shpotak@gmail.com',
    subject: req.body.subject,
    html: output
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  console.log(message);
})



app.listen(3000, function(){
  console.log('Listening the port 3000');
});