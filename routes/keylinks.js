var express = require("express");
var router = express.Router({mergeParams: true});



router.get("/keylinks", function(req, res){
    res.render("keylinks")
});

module.exports = router;