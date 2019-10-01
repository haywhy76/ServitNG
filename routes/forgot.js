var express = require("express");
var router = express.Router({mergeParams: true});
var async = require('async');
var Settings = require("../models/settings");
var nodemailer = require('nodemailer');


router.get("/forgot", function(req, res) {
    res.render("forgot");
  });


  router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!User) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
  
          User.resetPasswordToken = token;
          User.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'SendGrid',
          host:'smtp.sendgrid.net',
          port: 465,
          auth: {
            user: 'apikey',
            pass: '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'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@placementsng.com',
          subject: 'Placements NG Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });



  module.exports = router;