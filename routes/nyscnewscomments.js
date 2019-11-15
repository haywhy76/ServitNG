var express    = require("express");
var router     = express.Router({mergeParams:true});
var nyscnew = require("../models/nyscnews");
var nyscnewscomment = require("../models/nyscnewscomments");
var middleware = require("../middleware");

//================
// COMMENTS ROUTES
//================
router.get("/nyscnews/:id/comment/new",  function(req, res){
    //find campground by id
    nyscnew.findById(req.params.id,  function(err, allNyscNews){
        if (err){
            console.log(err);
        }
        else{
            res.render("nysccomments/new",{nyscnew:allNyscNews});
        }
    })
});

router.post("/nyscnews/:id/comment",  middleware.isLoggedIn, function(req, res){
    //lookup Campground using ID
    nyscnew.findById(req.params.id, function(err, nyscnew){
        if(err){
            console.log(err);
            res.redirect("/nyscnews");
        }
        else{
            nyscnewscomment.create(req.body.nyscnewscomment, function(err, nyscnewscomment){
                if (err){
                    console.log(err);
                }
                else{
                    nyscnewscomment.author.id = req.user._id;
                    nyscnewscomment.author.username = req.user.username;
                    nyscnewscomment.save();
                    nyscnew.nyscnewscomments.push(nyscnewscomment);
                    nyscnew.save();
                    res.redirect("/nyscnews/" + nyscnew._id);
                    
                }
              });
        }
    });
 });
 



//COMMENTS EDIT ROUTE
router.get("/nyscnews/:id/nyscnewscomments/comment_id/edit", function(req, res){
  res.send("hello")
});


// //COMMENT UPDATE
// router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res){
//     nyscnewscomment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//         if (err){
//             res.redirect("back");
//         }
//         else{
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     });
// });

// //DELETE COMMENT

// router.delete("/:comment_id", middleware.checkCommentOwnership,  function(req, res){
//     nyscnewscomment.findByIdAndRemove(req.params.comment_id, function(err){
//         if(err){
//         res.redirect("/back");
//         } else{
//             res.redirect("/campgrounds/"+ req.params.id);
//         }
// });
// });




 module.exports = router;