var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var internjob = require("../models/internjobs");
var corperjob = require("../models/corperjobs");
var premiumJob = require("../models/premiumjobs");
var setting = require("../models/settings");


//ALL JOBS


router.get("/jobs", middleware.isLoggedIn, function(req, res){
    
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
        }
    }).sort({'_id':-1});
   
    premiumJob.find({}, function(err, allPremiumJobs){
        if (err){
            console.log(err);
        }
        else{
            premiumjobs=allPremiumJobs;
            res.render("jobs/index",{internjobs:internjobs,corperjobs:corperjobs,premiumjobs:premiumjobs});
        }
    })
});

// SELECT THE KIND OF LISTING CORPER OR INTERN

router.get("/jobs/new", middleware.isLoggedIn,function(req, res){
    res.render("jobs/new")
});


//INTERNS
// VIEW ALL INTERN JOBS

router.get("/internjobs", middleware.isLoggedIn, function(req, res){
    
    internjob.find({},  function(err, allInternJobs){

        if (err){
            console.log(err);
        }
        else{
            internjobs=allInternJobs;
        }
    }).sort({'_id':-1});
   
   

    premiumJob.find({}, function(err, allPremiumJobs){
        if (err){
            console.log(err);
        }
        else{
            premiumjobs=allPremiumJobs;
            res.render("internjobs/index",{internjobs:internjobs, premiumjobs:premiumjobs});
        }
    })
});


// ADD a new intern job

router.post("/internjobs",middleware.isLoggedIn, function(req, res){
   
    var title =  req.body.title;
    var company  =  req.body.company;
    var location = req.body.location;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var description = req.body.description;
    var newJob = {title: title, company:company, location:location, description:description, author:author};
    //create a new job and save to DB
    internjob.create(newJob, function(err, newlyCreated){
        if (err){
            console.log(err);
        }else{
            res.redirect("/internjobs")
        }
    })
});

//CREATE a new intern job listing

router.get("/internjobs/new", middleware.isLoggedIn,function(req, res){
    res.render("internjobs/new")
});

//SHOW INFO ABOUT AN INTERN JOB LISTING

router.get("/internjobs/:id",middleware.isLoggedIn, function(req, res){
    //find the post with provided ID
   
    internjob.findById(req.params.id, function(err, foundinternjob){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
             res.render("internjobs/show", {internjob: foundinternjob});
        }
    })
});
    

//EDIT AN INTERN JOB LISTING
router.get("/internjobs/:id/edit",function(req, res){ 
       
    internjob.findById(req.params.id, function(err, foundinternjob){
                res.render("internjobs/edit", {internjob: foundinternjob});
    });
}); 

//UPDATE INTERN JOB LISTING

router.put("/internjobs/:id",middleware.checkInternJobOwnership, function(req, res){
    internjob.findByIdAndUpdate(req.params.id, req.body.internjob, function(err, updatedInternJob){
        if (err){
            res.redirect("/internjobs")
        }
        else{
            res.redirect("/internjobs/" + req.params.id)
        }
    })
});


//DELETE INTERN JOB LISTING

router.delete("/internjobs/:id",middleware.checkInternJobOwnership, function(req, res){
    internjob.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/internjobs");
        }
        else{
            res.redirect("/internjobs");
        }
    })
})

//CORP MEMBER

//INTERNS
// VIEW ALL CORPER JOBS

router.get("/corperjobs", middleware.isLoggedIn, function(req, res){
    
    corperjob.find({},  function(err, allCorperJobs){

        if (err){
            console.log(err);
        }
        else{
            corperjobs=allCorperJobs;
        }
    }).sort({'_id':-1});
   
   

    premiumJob.find({}, function(err, allPremiumJobs){
        if (err){
            console.log(err);
        }
        else{
            premiumjobs=allPremiumJobs;
            res.render("corperjobs/index",{corperjobs:corperjobs, premiumjobs:premiumjobs});
        }
    })
});


// ADD a new intern job

router.post("/corperjobs",middleware.isLoggedIn, function(req, res){
   
    var title =  req.body.title;
    var company  =  req.body.company;
    var location = req.body.location;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var description = req.body.description;
    var newJob = {title: title, company:company, location:location, description:description, author:author};
    //create a new job and save to DB
    corperjob.create(newJob, function(err, newlyCreated){
        if (err){
            console.log(err);
        }else{
            res.redirect("/corperjobs")
        }
    })
});

//CREATE a new intern job listing

router.get("/corperjobs/new", middleware.isLoggedIn,function(req, res){
    res.render("corperjobs/new")
});

//SHOW INFO ABOUT AN INTERN JOB LISTING

router.get("/corperjobs/:id",middleware.isLoggedIn, function(req, res){
    //find the post with provided ID
   
    corperjob.findById(req.params.id, function(err, foundcorperjob){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
             res.render("corperjobs/show", {corperjob: foundcorperjob});
        }
    })
});
    

//EDIT AN INTERN JOB LISTING
router.get("/corperjobs/:id/edit",function(req, res){ 
       
    corperjob.findById(req.params.id, function(err, foundcorperjob){
                res.render("corperjobs/edit", {corperjob: foundcorperjob});
    });
}); 

//UPDATE INTERN JOB LISTING

router.put("/corperjobs/:id",middleware.checkCorperJobOwnership, function(req, res){
    corperjob.findByIdAndUpdate(req.params.id, req.body.corperjob, function(err, updatedCorperJob){
        if (err){
            res.redirect("/corperjobs")
        }
        else{
            res.redirect("/corperjobs/" + req.params.id)
        }
    })
});


//DELETE INTERN JOB LISTING

router.delete("/corperjobs/:id",middleware.checkCorperJobOwnership, function(req, res){
    corperjob.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/corperjobs");
        }
        else{
            res.redirect("/corperjobs");
        }
    })
})


module.exports = router;