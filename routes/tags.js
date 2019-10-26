var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/tags", function(req, res){
  
    res.render("tags")
});



module.exports = router;