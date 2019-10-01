var express = require("express");
var router = express.Router({mergeParams: true});



router.get("/contact", function(req, res){
   
    res.render("contact")
});

module.exports = router;