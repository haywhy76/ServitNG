var express = require("express");
var internjob = require("../models/internjobs");
var router = express.Router({mergeParams: true});

router.get("/sortbyposition", function(req, res){
     //Get all forum posts from DB
    
     intrnjob.find({}, function(err, allJobs){
        if (err){
            console.log(err);
        }
        else{
            res.render("position",{jobs:allJobs});
        }
    })
});

module.exports = router;