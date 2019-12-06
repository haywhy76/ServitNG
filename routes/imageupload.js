var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/forum/settings/:id/imageupload", function(req, res){
    res.render("settings/imageupload")
});

router.post("/forum/settings/:id/imageupload")

module.exports = router;