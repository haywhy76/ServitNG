var express = require("express");
var router = express.Router();
var campexperience = require("../models/campexperiences");
var campexperiencestwo = require("../models/campexperiences");
var campexperiencesthree = require("../models/campexperiences");
// var campexperiencesthree = require("../models/campexperiences");
var middleware = require("../middleware");


//VIEW ALL CAMPGROUND EXPERIENCES
router.get("/campexperiences", function(req, res){

    campexperience.find({},  function(err, allCampExperiencesThree){
        if (err){
            console.log(err);
        }
        else{
            campexperiencesthree=allCampExperiencesThree;
        }
    }).limit(3).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiencesTwo){
        if (err){
            console.log(err);
        }
        else{
            campexperiencestwo=allCampExperiencesTwo;
        }
    }).limit(3).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiences){
        if (err){
            console.log(err);
        }
        else{
            res.render("campexperiences/index",{campexperiencesthree:campexperiencesthree, campexperiencestwo:campexperiencestwo, campexperiences:allCampExperiences});
        }
    }).sort({'_id':-1});

})

//ADD A CAMP EXPERIENCE

router.get("/campexperience/new", function(req, res){
   res.render("campexperiences/new")
})

router.post("/campexperience",middleware.isLoggedIn,  function(req, res){
   
    var campexperiencetitle =  req.body.campexperiencetitle;
    var campexperiencebody = req.body.campexperiencebody;
    var campexperiencepicture = req.body.campexperiencepicture;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampExperience = {campexperiencetitle: campexperiencetitle, campexperiencebody:campexperiencebody,campexperiencepicture:campexperiencepicture, author:author};
    //create a new news and save to DB
    campexperience.create(newCampExperience, function(err, newlyCreatedCampExperience){
        if (err){
            console.log(err);
        }else{
            res.redirect("/campexperiences")
        }
    })
});

//SHOW PAGE FOR CAMP EXPERIENCE
router.get("/campexperience/:id", function(req, res){
    campexperience.find({},  function(err, allCampExperiences){

        if (err){
            console.log(err);
        }
        else{
            campexperiences=allCampExperiences;
        }
    }).limit(3).sort({'_id':-1})
   
    campexperience.findById(req.params.id, function(err, foundcampexperience){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
             res.render("campexperiences/show", {campexperience: foundcampexperience, campexperiences:campexperiences});
        }
    })
});


//EDIT CAMP EXPERIENCE
router.get("/campexperience/:id/edit",middleware.checkCampExperienceOwnership,function(req, res){ 
       
    campexperience.findById(req.params.id, function(err, foundcampexperience){
                res.render("campexperiences/edit", {campexperience: foundcampexperience});
    });
}); 

//UPDATE CAMP EXPERIENCE

router.put("/campexperience/:id",middleware.checkCampExperienceOwnership, function(req, res){
    campexperience.findByIdAndUpdate(req.params.id, req.body.campexperience, function(err, updatedCampExperience){
        if (err){
            res.redirect("/campexperiences/index")
        }
        else{
            res.redirect("/campexperience/" + req.params.id)
        }
    })
});


//DELETE CAMP EXPERIENCE

router.delete("/campexperience/:id",middleware.checkNyscNewsOwnership, function(req, res){
    campexperience.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campexperiences");
        }
        else{
            res.redirect("/campexperiences");
        }
    })
})


module.exports = router;