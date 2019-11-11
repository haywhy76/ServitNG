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
    nyscnew.find({},  function(err, allNyscNews){
        if (err){
            console.log(err);
        }
        else{
            res.send("comments/new",{nyscnews:allNyscNews});
        }
    })
});

// router.post("/",  middleware.isLoggedIn, function(req, res){
//     //lookup Campground using ID
//     nyscnewscomment.findById(req.params.id, function(err, nyscnewscomment){
//         if(err){
//             console.log(err);
//             res.redirect("/");
//         }
//         else{
//           Comment.create(req.body.comment, function(err, comment){
//             if (err){
//                 req.flash("error", "Something went wrong");
//                 console.log(err);
//             }
//             else{
//                 //add username and id to comment
//                 comment.author.id = req.user._id;
//                 comment.author.username = req.user.username;
//                 //save comment
//                 comment.save();
//                 campground.comments.push(comment);
//                 campground.save();
//                 console.log(comment);
//                 req.flash("success", "Successfully added comment");
//                 res.redirect("/campgrounds/" + campground._id);
//             }
//           });
//         }
//     });
//  });
 



// //COMMENTS EDIT ROUTE
// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//     nyscnewscomment.findById(req.params.comment_id, function(err, foundComment){
//         if (err){
//             res.redirect("back");
//         }
//         else{
//             res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
//         }
//     })
// });


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