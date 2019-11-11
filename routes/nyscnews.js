var express = require("express");
var router = express.Router();
var nyscnew = require("../models/nyscnews");
var middleware = require("../middleware");



//VIEW ALL NYSC NEWS
router.get("/nyscnews", function(req, res){
    nyscnew.find({},  function(err, allNyscNews){
        if (err){
            console.log(err);
        }
        else{
            res.render("nyscnews/index",{nyscnews:allNyscNews});
        }
    }).sort({'_id':-1});

})

//ADD A NEW NEWS

router.get("/nyscnews/new", function(req, res){
   res.render("nyscnews/new")
})

router.post("/nyscnews",middleware.isLoggedIn,function(req, res){
   
    var newstitle =  req.body.newstitle;
    var newsbody = req.body.newsbody;
    var newspicture = req.body.newspicture;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newNew = {newstitle: newstitle, newsbody:newsbody, newspicture:newspicture, author:author};
    //create a new news and save to DB
    nyscnew.create(newNew, function(err, newlyCreatedNyscNew){
     
        if (err){
            console.log(err);
        }else{
            res.redirect("/nyscnews")
        }
       
    })
});

//SHOW PAGE FOR NEWS
router.get("/nyscnews/:id",middleware.isLoggedIn, function(req, res){
    //find the post with provided ID
    nyscnew.find({},  function(err, allNyscNews){

        if (err){
            console.log(err);
        }
        else{
            nyscnews=allNyscNews;
        }
    }).limit(3).sort({'_id':-1})
    
    nyscnew.findById(req.params.id, function(err, foundnyscnew){
        if(err){
            console.log(err);
        }else{
           
             res.render("nyscnews/show", {nyscnew: foundnyscnew, nyscnews:nyscnews});
        }
    })
});


//EDIT NEWS
router.get("/nyscnews/:id/edit",middleware.checkNyscNewsOwnership,function(req, res){ 
       
    nyscnew.findById(req.params.id, function(err, foundnyscnew){
                res.render("nyscnews/edit", {nyscnew: foundnyscnew});
    });
}); 

//UPDATE INTERN JOB LISTING

router.put("/nyscnews/:id",middleware.checkNyscNewsOwnership, function(req, res){
    nyscnew.findByIdAndUpdate(req.params.id, req.body.nyscnew, function(err, updatedNyscNew){
        if (err){
            res.redirect("/nyscnews/index")
        }
        else{
            res.redirect("/nyscnews/" + req.params.id)
        }
    })
});


//DELETE INTERN JOB LISTING

router.delete("/nyscnews/:id",middleware.checkNyscNewsOwnership, function(req, res){
    nyscnew.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/nyscnews");
        }
        else{
            res.redirect("/nyscnews");
        }
    })
})


module.exports = router;