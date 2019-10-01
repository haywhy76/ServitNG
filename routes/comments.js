var express = require("express");
var router = express.Router({mergeParams: true});
var Forumpost = require("../models/qsforum");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//==============
//COMMENTS ROUTE
//==============

//Create a comment
router.get("/new", middleware.isLoggedIn, function (req, res){
    Forumpost.findById(req.params.id,function(err, forumpost){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {forumpost:forumpost});
        }
    }) 
});

//Submit the comment
router.post("/", middleware.isLoggedIn, function (req, res){
    Forumpost.findById(req.params.id, function(err, forumpost){
        if(err){
            console.log(err);
            res.redirect("/forum");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "something went wrong!");
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    forumpost.comments.push(comment);
                    forumpost.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/forum/' + forumpost._id);
                }
            })
        }
    })
    
});

//Edit a comment

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        }else{
            res.render("comments/edit", {forumpost_id: req.params.id, comment: foundComment});
        }
    })     
});

//Update a comment

router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/forum/" + req.params.id);
        }
        });     
});

//DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
 if(err){
     res.redirect("back");
 }
 else{
    req.flash("success", "Comment deleted");
    res.redirect("/forum/" + req.params.id);
 }
    });
 });


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                res.redirect("back");
            }
            else{
            //does the user own the comment?
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You do not have permission to do that");
                res.redirect("back");
                }
                    }
                });
            }
            else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
            }
    };



module.exports = router;