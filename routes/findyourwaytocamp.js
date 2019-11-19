var express = require("express");
var internjob = require("../models/internjobs");
var router = express.Router({mergeParams: true});

router.get("/findyourwaytocamp", function(req, res){
   res.render("findyourwaytocamp");
});

module.exports = router;