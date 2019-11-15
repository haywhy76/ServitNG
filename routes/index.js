
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var roomate = require("../models/roomates");
var nyscnew = require("../models/nyscnews");
var nyscnewsthree = require("../models/nyscnews");
var nyscnewsfour = require("../models/nyscnews");
var nyscnewsfive = require("../models/nyscnews");
var campexperience = require("../models/campexperiences");
var campexperiencesthree = require("../models/campexperiences");
var campexperiencesfour = require("../models/campexperiences");
var campexperiencesfive = require("../models/campexperiences");
var payment = require("../models/payment");
let gfs
var subscriber = require("../models/subscribe");
var contact = require("../models/contact");
var async = require('async');
var nodemailer = require('nodemailer');
var Settings = require("../models/settings");
var internjob = require("../models/internjobs");

// Landing Page
router.get("/", function(req, res){
    nyscnew.find({},  function(err, allNyscNews){
        if (err){
            console.log(err);
        }
        else{
            nyscnews=allNyscNews;
        }
    }).limit(1).sort({'_id':-1});

    nyscnew.find({},  function(err, allNyscNewsThree){
        if (err){
            console.log(err);
        }
        else{
            nyscnewsthree=allNyscNewsThree;
        }
    }).limit(3).sort({'_id':-1});

    nyscnew.find({},  function(err, allNyscNewsFour){
        if (err){
            console.log(err);
        }
        else{
            nyscnewsfour=allNyscNewsFour;
        }
    }).skip(3).limit(6).sort({'_id':-1}); 

    nyscnew.find({},  function(err, allNyscNewsFive){
        if (err){
            console.log(err);
        }
        else{
            nyscnewsfive=allNyscNewsFive;
        }
    }).skip(6).limit(3).sort({'_id':-1}); 

    roomate.find({},  function(err, allRoomates){
        if (err){
            console.log(err);
        }
        else{
            roomatess=allRoomates;
        }
    }).limit(4).sort({'_id':-1});

    roomate.find({},  function(err, allRoomates){
        if (err){
            console.log(err);
        }
        else{
            roomatesss=allRoomates;
        }
    }).limit(1).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiencesThree){
        if (err){
            console.log(err);
        }
        else{
            campexperiencesthree=allCampExperiencesThree;
        }
    }).limit(6).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiencesFour){
        if (err){
            console.log(err);
        }
        else{
            campexperiencesfour=allCampExperiencesFour;
        }
    }).skip(3).limit(2).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiencesFive){
        if (err){
            console.log(err);
        }
        else{
            campexperiencesfive=allCampExperiencesFive;
        }
    }).skip(6).limit(2).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiences){

        if (err){
            console.log(err);
        }
        else{
            campexperiences=allCampExperiences;
            res.render("landing",{nyscnews:nyscnews,nyscnewsthree: nyscnewsthree, nyscnewsfour:nyscnewsfour, nyscnewsfive:nyscnewsfive, roomatess:roomatess, roomatesss:roomatesss,campexperiencesthree:campexperiencesthree, campexperiencesfour:campexperiencesfour, campexperiencesfive:campexperiencesfive, campexperiences:campexperiences});
        }
    }).limit(1).sort({'_id':-1});
    
})

router.get("/connect", function(req, res){
    res.render("connect")

})

//IMAGE UPLOAD

// router.get("/imageupload", function(req,res){
// 	res.render("imageupload")
// })

// router.post('/imageupload', upload.single('photo'), (req, res) => {
//     if(req.file) {
//         res.json(req.file);
//         res.redirect("imageupload");
//     }
//     else throw 'error';
//     document
//   .getElementById('img')
//   .setAttribute('src', `mongodb+srv://itandppa:itandppa@clusteritandppa-ffmfj.mongodb.net/test?retryWrites=true&w=majority/${file[0].name}`)
// });

//VIEW
// router.get('/imageupload', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       // Check if file
//       if (!file || file.length === 0) {
//         return res.status(404).json({
//           err: 'No file exists',
//         })
//       }
  
//       // Check if image
//       if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//         // Read output to browser
//         const readstream = gfs.createReadStream(file.filename)
//         readstream.pipe(res)
//       } else {
//         res.status(404).json({
//           err: 'Not an image',
//         })
//       }
//     })
//   })


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

//Handle payment form

router.post("/payment", function(req, res){
    var firstname = req.body.paymentfirstname;
    var lastname = req.body.paymentlastname;
    var email =  req.body.paymentemail;
    var institution =  req.body.paymentinstitution;
    var matric =  req.body.paymentmatric;
    var location =  req.body.paymentlocation;
    var newPayment = {paymentfirstname:firstname,paymentlastname:lastname,paymentemail: email,paymentinstitution:institution,paymentmatric:matric,paymentlocation:location  };
    //create a new subscription and save to DB
    payment.create(newPayment, function(err, newlyCreatedPayment){
        if (err){
            console.log(err);
        }else{
          res.redirect("/getstarted")
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






module.exports = router;
