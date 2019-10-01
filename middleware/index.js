var Forumpost = require("../models/qsforum");
var Comment = require("../models/comment");
var internJobs = require("../models/internjobs")
var corperJobs = require("../models/corperjobs")
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkInternJobOwnership = function(req, res, next){
        if(req.isAuthenticated()){ 
            internJobs.findById(req.params.id, function(err, foundInternJob){
                if (err){
                    req.flash("error", "Job not found");
                    res.redirect("back");
                }
                else{
                        //does user own the job listing
                    if(foundInternJob.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You don`t have permission to do that");
                        res.redirect("back");
                    }
                    }
                });
                }else{
                        req.flash("error", "You need to be logged in to do that");
                        res.redirect("back")
                    }
                };

middlewareObj.checkCorperJobOwnership = function(req, res, next){
        if(req.isAuthenticated()){ 
            corperJobs.findById(req.params.id, function(err, foundCorperJob){
                if (err){
                    req.flash("error", "Job not found");
                    res.redirect("back");
                }
                else{
                        //does user own the job listing
                    if(foundCorperJob.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You don`t have permission to do that");
                        res.redirect("back");
                    }
                    }
                });
                }else{
                        req.flash("error", "You need to be logged in to do that");
                        res.redirect("back")
                    }
                };

middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){ 
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if (err){
                    res.redirect("back");
                }
                else{
                        //does user own the comment
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You dont have permission to do that");
                        res.redirect("back");
                    }
                    }
                });
                }else{
                    req.flash("error", "You need to be logged in to do that");
                        res.redirect("back")
                    }
                };

middlewareObj.isLoggedIn = function (req, res, next){
                    if(req.isAuthenticated()){
                        return next()
                    }
                    req.flash("error", "You need to be logged in to do that");
                    res.redirect("/login");
                }
                



module.exports = middlewareObj