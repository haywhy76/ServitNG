var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var premiumJob = require("../models/premiumjobs");

router.get("/premiumjobs", middleware.isLoggedIn, function(req, res){
    premiumJob.find({}, function(err, allPremiumJobs){
        if (err){
            console.log(err);
        }
        else{
            res.render("premiumjobs/index",{premiumjobs:allPremiumJobs});
        }
    })
   
});

// ADD a new job

router.post("/premiumjobs",middleware.isLoggedIn, function(req, res){
   
    var title =  req.body.title;
    var company  =  req.body.company;
    var location = req.body.location;
    var description = req.body.description;
    var newPremiumJob = {title: title, company:company, location:location, description:description};
    //create a new job and save to DB
    premiumJob.create(newPremiumJob, function(err, newlyCreated){
        if (err){
            console.log(err);
        }else{
            res.redirect("/premiumjobs")
        }
    })
});

//CREATE a new job listing

router.get("/premiumjobs/new", middleware.isLoggedIn,function(req, res){
    res.render("premiumjobs/new")
});

//SHOW INFO ABOUT A JOB LISTING

router.get("/premiumjobs/:id",middleware.isLoggedIn, function(req, res){
    //find the post with provided ID
   
    premiumJob.findById(req.params.id, function(err, foundpremiumjob){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
             res.render("premiumjobs/show", {premiumjob: foundpremiumjob});
        }
    })
});
    

//EDIT A JOB LISTING
router.get("/premiumjobs/:id/edit", function(req, res){ 
       
    premiumJob.findById(req.params.id, function(err, foundpremiumjob){
                res.render("premiumjobs/edit", {premiumjob: foundpremiumjob});
    });
}); 

//UPDATE JOB LISTING

router.put("/premiumjobs/:id", function(req, res){
    premiumJob.findByIdAndUpdate(req.params.id, req.body.job, function(err, updatedJob){
        if (err){
            res.redirect("/premiumjobs")
        }
        else{
            res.redirect("/premiumjobs/" + req.params.id)
        }
    })
});


//DELETE JOB LISTING

router.delete("/premiumjobs/:id", function(req, res){
    premiumJob.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/premiumjobs");
        }
        else{
            res.redirect("/premiumjobs");
        }
    })
})

module.exports = router;