var express = require("express");
var internjob = require("../models/internjobs");
var corperjob = require("../models/corperjobs");
var campexperience = require("../models/campexperiences");
var roomate = require("../models/roomates");
var verified = require("../models/payment");
var middleware = require("../middleware");
var user = require("../models/user");
var Adminuser = require("../models/adminuser");


var router = express.Router({mergeParams: true});



// Register An Admin
// router.get("/adminregister", function(req, res){
//     res.render("admin/adminregister")
   
// });

// Admin Signup Logic

// router.post("/adminregister", function(req, res){
//     var adminUser = new Adminuser({username: req.body.adminusername});
//     Adminuser.register(adminUser, req.body.adminpassword, function(err, adminUser){
//                 if (err){
//                     req.flash("error", err.message);
//                     return res.render("admin/adminregister")
//                 }
//                 else{
//                     passport.authenticate("Local")(req, res, function(){
//                         res.redirect("/admin");
//                     });
//                 }
//     });
// });

//Show login form

// router.get("/adminlogin", function(req, res){
//     res.render("admin/adminlogin")
// });

//Handle login logic

// router.post("/adminlogin", passport.authenticate("userLocal", {
//     successRedirect: "/admin", 
//     failureRedirect:"/adminlogin"
// }), function(req, res){
        
// });

// Admin Homepage
router.get("/adminlol", middleware.isLoggedIn, function(req, res){
    internjob.count({}, function( err, internjobcount){
        if (err){
            console.log(err);
        }
    else{
        noofinternjobs = internjobcount
        }   
    })

    campexperience.count({}, function( err, campexperiencecount){
        if (err){
            console.log(err);
        }
    else{
        noofcampexperiences = campexperiencecount
        }   
    })

    payment.count({}, function( err, paymentcount){
        if (err){
            console.log(err);
        }
    else{
        noofpayments = paymentcount
        }   
    })

    roomate.count({}, function( err, roomatecount){
        if (err){
            console.log(err);
        }
    else{
        noofroomates = roomatecount
        }   
    })

    user.count({}, function( err, usercount){
        if (err){
            console.log(err);
        }
    else{
        noofusers = usercount
        }   
    })

    corperjob.count({}, function( err, corperjobcount){
        if (err){
            console.log(err);
        }
    else{
        noofcorperjobs = corperjobcount
        res.render("admin/index", { noofcorperjobs: noofcorperjobs, noofinternjobs: noofinternjobs,
             noofcampexperiences:noofcampexperiences, noofpayments:noofpayments, noofroomates:noofroomates, noofusers:noofusers}); 
        }   
    })

});




// Interns Listings

router.get("/admin/internlistings", function(req, res){
    internjob.find({},  function(err, allInternJobs){
        if (err){
            console.log(err);
        }
        else{
            res.render("admin/internlistings",{internjobs:allInternJobs});
        }
    }).sort({'_id':-1});
    
});

// Corps Members Listings

router.get("/admin/corpsmemberslistings", function(req, res){
    corperjob.find({},  function(err, allCorperJobs){
        if (err){
            console.log(err);
        }
        else{
            res.render("admin/corpsmemberslistings",{corperjobs:allCorperJobs}); 
        }
    }).sort({'_id':-1});
   
});

// Camp Experiences

router.get("/admin/campexperiences", function(req, res){
    campexperience.find({},  function(err, allCampExperiences){
        if (err){
            console.log(err);
        }
        else{
            res.render("admin/campexperiences",{campexperiences:allCampExperiences});
        }
    }).sort({'_id':-1});
   
});

// Roomates

router.get("/admin/roomates", function(req, res){
    roomate.find({},  function(err, allRoomates){
        if (err){
            console.log(err);
        }
        else{
            res.render("admin/roommatelistings",{roomates:allRoomates});
        }
    }).sort({'_id':-1});
});

// Paid Users

router.get("/admin/paidusers", function(req, res){
    verified.find({},  function(err, allVerifiedUsers){
        if (err){
            console.log(err);
        }
        else{
            res.render("admin/paidusers",{verifieds:allVerifiedUsers});
        }
    }).sort({'_id':-1});
});

// Approved Users

router.get("/admin/approvedusers", function(req, res){
    user.find({},  function(err, allUsers){
        if (err){
            console.log(err);
        }
        else{
            res.render("admin/approvedusers",{users:allUsers});
        }
    }).sort({'_id':-1});
});

module.exports = router;