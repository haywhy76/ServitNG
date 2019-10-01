var express = require("express");
var internjob = require("../models/internjobs");
var router = express.Router({mergeParams: true});

router.get("/sortbylocation", function(req, res){
     //Get all forum posts from DB
    
     internjob.find({}, function(err, allJobs){
        if (err){
            console.log(err);
        }
        else{
            res.render("location",{jobs:allJobs});
        }
    })
});

module.exports = router;