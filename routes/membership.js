var express = require("express");
var router = express.Router({mergeParams: true});



router.get("/membership", function(req, res){
    res.render("membership")
});

module.exports = router;