var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var internjob = require("../models/internjobs");
var corperjob = require("../models/corperjobs");
var middleware = require("../middleware");
var Settings = require("../models/settings");

router.get("/settings/view",middleware.isLoggedIn, function(req, res){
    Settings.findById(req.params.id,function(err, foundSettings){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("settings/view",{settings : foundSettings })
        }
    });
  
});

//A user registers fully

router.post("/settings",  function(req, res){
    var fullname =  req.body.fullname;
    var email  =  req.body.email;
    var location = req.body.location;
    var phonenumber = req.body.phonenumber;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newSettings = {fullname: fullname, email:email, location:location, phonenumber:phonenumber, author:author};
    //create settings and save to DB
    Settings.create(newSettings, function(err, newlyCreated){
        if (err){
            req.flash("error", "something went wrong!");
            console.log(err);
        }else{
            res.redirect("/jobs");
        }
    })
});

//show registration page
router.get("/settings/new", function(req, res){
    res.render("settings/new")
});


// Shows a users profile

// router.get("/settings",middleware.isLoggedIn, function(req, res){
//     //find the post with provided ID
//     Settings.findById(req.params.id,function(err, foundSettings){
//         if(err){
//             console.log(err);
//         }else{
//             //render show template with that campground
//              res.render("settings/index", {settings: foundSettings});
//         }
//     });
    
// });


router.get("/settings/:id",middleware.isLoggedIn, function(req, res){
    //find the post with provided ID
    Settings.findById(req.params.id,function(err, foundSettings){
        if(err){
            console.log(err);
        }else{
            settings= foundSettings; 
        }
    });
    internjob.find({},  function(err, allInternJobs){

        if (err){
            console.log(err);
        }
        else{
            internjobs=allInternJobs;
        }
    }).sort({'_id':-1});

    corperjob.find({},  function(err, allCorperJobs){

        if (err){
            console.log(err);
        }
        else{
            corperjobs=allCorperJobs;
            res.render("settings/index",{settings:settings,internjobs:internjobs,corperjobs:corperjobs,});
        }
    }).sort({'_id':-1});

   
});


//Edit users profile
router.get("/settings/:id/edit",middleware.isLoggedIn, function(req, res){
    Settings.findById(req.params.id,function(err, foundSettings){
             res.render("settings/edit", {settings: foundSettings});
        }
    );
});


//Updates edited users profile

router.put("/settings/:id", middleware.isLoggedIn, function(req, res){
    Settings.findByIdAndUpdate(req.params.id, req.body.editsettings, function(err, updatedSettings){
         if(err){
             res.redirect("/jobs");
         }
         else{
             res.redirect("/mylistings");
         }
         });
         });
 



module.exports = router;