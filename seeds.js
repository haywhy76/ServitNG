var mongoose  = require("mongoose");
var forumpost = require("./models/qsforum");
var Comment = require("./models/comment");


//Remove all forumposts
function seedDB(){
    forumpost.remove({}, function(err){
        if (err){
            console.log("err");
        }
        console.log("removed forumpost");
    })
}

//Add a few forumposts
// var data = [
//     {title: "Estimating", 
//     tags: "#estimating, #construction",
//     image:"http://www.scquantitysurveyors.com/wp-content/uploads/2018/01/business-gallery3-1170x658.jpg",
//     bodymarkdown: "We provide a full range of Quantity Surveying & Estimating services for our clients in relation to building a new house, refurbishing, renovating or extending your existing dwelling."
//     },

//     {title: "Estimating", 
//     tags: "#estimating, #construction",
//     image:"http://www.scquantitysurveyors.com/wp-content/uploads/2018/01/business-gallery3-1170x658.jpg",
//     bodymarkdown: "We provide a full range of Quantity Surveying & Estimating services for our clients in relation to building a new house, refurbishing, renovating or extending your existing dwelling."
//     },

//     {title: "Estimating", 
//     tags: "#estimating, #construction",
//     image:"http://www.scquantitysurveyors.com/wp-content/uploads/2018/01/business-gallery3-1170x658.jpg",
//     bodymarkdown: "We provide a full range of Quantity Surveying & Estimating services for our clients in relation to building a new house, refurbishing, renovating or extending your existing dwelling."
//     },

// ]

//             data.forEach(function(seed){
//                 forumpost.create(seed, function(err, forumpost){
//                         if(err){
//                             console.log("");
//                         }
//                         else{
//                             console.log("added a forumpost")
//                             //create a comment
//                             Comment.create(
//                                 {
//                                     text: "This place is great, but i wish there was internet",
//                                     author: "Homer"
//                                 }, function(err, comment){
//                                     if(err){
//                                         console.log(err);
//                                     }else{
//                                         forumpost.comments.push(comment);
//                                         forumpost.save()
//                                         console.log("created new comment");
//                                     }
                                    
//                                 });
//                         }
//                 });
//             });

//COMMENT

//Add a few comments

module.exports = seedDB;