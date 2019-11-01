var express = require("express");
var Settings = require("../models/settings");
var router = express.Router({mergeParams: true});



router.get("/keylinks", function(req, res){
    Settings.find({},function(err, foundSetting){
        if(err){
            console.log(err);
        }else{
            res.render("keylinks", {settings:foundSetting});
        }
    });
   
});

module.exports = router;