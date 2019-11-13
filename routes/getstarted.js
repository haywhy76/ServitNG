var express = require("express");
var router = express.Router();


router.get("/getstarted", function(req, res){
    res.render("getstarted")
});

module.exports = router;