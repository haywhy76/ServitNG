

var internJobs = require("../models/internjobs")
var corperJobs = require("../models/corperjobs")
var campExperiences = require("../models/campexperiences")
var nyscNews = require("../models/nyscnews")
var roomates = require("../models/roomates")
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
             
                        next();
                    
                    }
                });
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
                        
                        next();
                    }
                });
                }
                };


                middlewareObj.checkNyscNewsOwnership = function(req, res, next){
                    if(req.isAuthenticated()){ 
                        nyscNews.findById(req.params.id, function(err, foundNyscNews){
                            if (err){
                                req.flash("error", "Job not found");
                                res.redirect("back");
                            }
                            else{
                                    //does user own the job listing
                                if(foundNyscNews.author.id.equals(req.user._id)){
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

 middlewareObj.checkCampExperienceOwnership = function(req, res, next){
    if(req.isAuthenticated()){ 
        campExperiences.findById(req.params.id, function(err, foundCampExperience){
        if (err){
            req.flash("error", "Camp experience not found");
            res.redirect("back");
                }
            else{
                //does user own the camp experience
            if(foundCampExperience.author.id.equals(req.user._id)){
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


            middlewareObj.checkRoomateOwnership = function(req, res, next){
                if(req.isAuthenticated()){ 
                    roomates.findById(req.params.id, function(err, foundRoomate){
                    if (err){
                        req.flash("error", "Camp experience not found");
                        res.redirect("back");
                            }
                        else{
                            //does user own the camp experience
                        if(foundRoomate.author.id.equals(req.user._id)){
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


middlewareObj.isLoggedIn = function (req, res, next){
                    if(req.isAuthenticated()){
                        return next()
                    }
                    req.flash("error", "You need to be logged in to do that");
                    res.redirect("/login");
                }
                

module.exports = middlewareObj