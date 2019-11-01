var express = require("express");
var middleware = require("../middleware");
var internjob = require("../models/internjobs");
var corperjob = require("../models/corperjobs");
var setting = require("../models/settings");

var router = express.Router({mergeParams: true});

router.get("/mylistings",middleware.isLoggedIn, function(req, res){
    setting.find({},function(err, foundSettings){
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
            res.render("mylistings",{settings:settings,internjobs:internjobs,corperjobs:corperjobs});
        }
    }).sort({'_id':-1});
   
});

module.exports = router;