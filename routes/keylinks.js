var express = require("express");
var Settings = require("../models/settings");
var router = express.Router({mergeParams: true});



router.get("/keylinks", function(req, res){
    Settings.find({},function(err, foundSettings){
        if(err){
            console.log(err);
        }else{
            settings= foundSettings; 
            res.render("keylinks", {settings:settings});
        }
    });
   
});

module.exports = router;