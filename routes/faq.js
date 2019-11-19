var express = require("express");
var router = express.Router({mergeParams: true});



router.get("/faq", function(req, res){
   
    res.render("faq")
});


module.exports = router;