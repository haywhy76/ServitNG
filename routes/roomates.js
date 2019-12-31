var express = require("express");
var router = express.Router();
var roomate = require("../models/roomates");
var middleware = require("../middleware");



//VIEW ALL ROOMATES
router.get("/roomates", function(req, res){
    roomate.find({},  function(err, allRoomates){
        if (err){
            console.log(err);
        }
        else{
            res.render("roomates/index",{roomates:allRoomates});
        }
    }).sort({'_id':-1});

})

//ADD A NEW ROOMATE

router.get("/roomates/new", function(req, res){
   res.render("roomates/new")
})

router.post("/roomates",function(req, res){
   
    var roomatetitle =  req.body.roomatetitle;
    var roomatebody = req.body.roomatebody;
    var roomatepicture = req.body.roomatepicture;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRoomate = {roomatetitle: roomatetitle, roomatebody:roomatebody, roomatepicture:roomatepicture, author:author};
    //create a new news and save to DB
    roomate.create(newRoomate, function(err, newlyCreatedRoomate){
     
        if (err){
            console.log(err);
        }else{
            res.redirect("/roomates")
        }
       
    })
});

//SHOW PAGE FOR ROOMATE
router.get("/roomates/:id", function(req, res){
    //find the post with provided ID
    roomate.find({},  function(err, allRoomates){

        if (err){
            console.log(err);
        }
        else{
            roomates=allRoomates;
        }
    }).limit(3).sort({'_id':-1})
    
    roomate.findById(req.params.id, function(err, foundroomate){
        if(err){
            console.log(err);
        }else{
           
             res.render("roomates/show", {roomate: foundroomate, roomates:roomates});
        }
    })
});


//EDIT ROOMATE
router.get("/roomates/:id/edit",function(req, res){ 
       
    roomate.findById(req.params.id, function(err, foundroomate){
                res.render("roomates/edit", {roomate: foundroomate});
    });
}); 

//UPDATE ROOMATE

router.put("/roomates/:id", function(req, res){
    roomate.findByIdAndUpdate(req.params.id, req.body.roomate, function(err, updatedRoomate){
        if (err){
            res.redirect("/roomates/index")
        }
        else{
            res.redirect("/roomates/" + req.params.id)
        }
    })
});


//DELETE ROOMATE

router.delete("/nyscnews/:id", function(req, res){
    roomate.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/roomates");
        }
        else{
            res.redirect("/roomates");
        }
    })
})


module.exports = router;