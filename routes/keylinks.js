var express = require("express");
var Settings = require("../models/settings");
var router = express.Router({mergeParams: true});



router.get("/keylinks", function(req, res){
    res.render("keylinks");
        } 
);

router.get("/termsofuse", function(req, res){
    res.render("termsofuse");
        } 
);

module.exports = router;