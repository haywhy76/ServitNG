
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var subscriber = require("../models/subscribe");
var contact = require("../models/contact");
var async = require('async');
var nodemailer = require('nodemailer');
var Settings = require("../models/settings");
var internjob = require("../models/internjobs");

// Landing Page
router.get("/", function(req, res){
    res.render("landing")

})

//===========
//AUTH ROUTES
//===========

//Show register form
router.get("/register", function(req, res){
    res.render("register")
   
});

//Handle signup logic

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
                if (err){
                    req.flash("error", err.message);
                    return res.render("register")
                }
                else{
                    passport.authenticate("local")(req, res, function(){
                        req.flash("success", "Welcome to Placements NG, " + user.username + ".");
                        res.redirect("/settings/new");
                    });
                }
    });
});

 
//Show login form

router.get("/login", function(req, res){
    res.render("login")
});

//Handle login logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/jobs", 
    failureRedirect:"/login"
}), function(req, res){
        
});


//Handle subscription form

router.post("/subscribe", function(req, res){
  var email =  req.body.subscriberemail;
  var newSubscriber = {email: email};
  //create a new subscription and save to DB
  subscriber.create(newSubscriber, function(err, newlyCreatedSubscriber){
      if (err){
          console.log(err);
      }else{
        res.redirect("/jobs")
      }
  })
});

//Handle contact form
router.post("/contactus", function(req, res){
  var name =  req.body.contactname;
  var email =  req.body.contactemail;
  var message =  req.body.contactmessage;
  var newContact = {name:name, email: email, message:message};
  //create a new subscription and save to DB
  contact.create(newContact, function(err, newlyCreatedContact){
      if (err){
          console.log(err);
      }else{
        res.redirect("/")
      }
  })
});

//Logout route

router.get("/logout", function(req, res){
    req.logout(); 
    req.flash("success" , "Logged you out");
    res.redirect("/");
});




// RESET TOKEN

router.get("/reset/:token", function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!User) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      currentUser: req.user
    });
  });
});


router.post("/reset/:token", function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!User) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        User.password = req.body.password;
        User.resetPasswordToken = undefined;
        User.resetPasswordExpires = undefined;
        
        User.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });

      

      });
    },
    function(user, done) {
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
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/jobs');
  });
});

module.exports = router;
