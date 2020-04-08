var express = require("express");
var router = express.Router();
var campexperience = require("../models/campexperiences");
var campexperiencestwo = require("../models/campexperiences");
var campexperiencesthree = require("../models/campexperiences");
// var campexperiencesthree = require("../models/campexperiences");
var middleware = require("../middleware");
var request = require("request");


var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'servitng', 
  api_key: '149265356114627', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});







//VIEW ALL CAMPGROUND EXPERIENCES
router.get("/campexperiences", function(req, res){

    campexperience.find({},  function(err, allCampExperiencesThree){
        if (err){
            console.log(err);
        }
        else{
            campexperiencesthree=allCampExperiencesThree
        }
    }).limit(3).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiencesTwo){
        if (err){
            console.log(err);
        }
        else{
            campexperiencestwo=allCampExperiencesTwo
        }
    }).limit(3).sort({'_id':-1});

    campexperience.find({},  function(err, allCampExperiences){
        if (err){
            console.log(err);
        }
        else{
            res.render("campexperiences/index",{campexperiencesthree:campexperiencesthree, 
                campexperiencestwo:campexperiencestwo, 
                campexperiences:allCampExperiences});
        }
    }).sort({'_id':-1});

})

//ADD A CAMP EXPERIENCE

router.get("/campexperience/new", function(req, res){
   res.render("campexperiences/new")
})

router.post("/campexperience",upload.single('image'), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
        // add cloudinary url for the image to the campground object under image property
        req.body.campexperience.image =  result.secure_url;
        req.body.campexperience.imageId = result.public_id;
        // add author to campground
       
        campexperience.create(req.body.campexperience, function(err, newlyCreatedCampExperience){
            if (err){
                console.log(err);
            }else{
                res.redirect("/campexperiences")
        };
      });
})});

//SHOW PAGE FOR CAMP EXPERIENCE
router.get("/campexperience/:id", function(req, res){
    campexperience.find({},  function(err, allCampExperiences){

        if (err){
            console.log(err);
        }
        else{
            campexperiences=allCampExperiences;
        }
    }).limit(3).sort({'_id':-1})
   
    campexperience.findById(req.params.id, function(err, foundcampexperience){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
             res.render("campexperiences/show", {campexperience: foundcampexperience, campexperiences:campexperiences});
        }
    })
});


//EDIT CAMP EXPERIENCE
router.get("/campexperience/:id/edit", function(req, res){ 
       
    campexperience.findById(req.params.id, function(err, foundcampexperience){
                res.render("campexperiences/edit", {campexperience: foundcampexperience});
    });
}); 

//UPDATE CAMP EXPERIENCE

router.put("/campexperience/:id",upload.single('image'), function(req, res){
    campexperience.findById(req.params.id, async function(err, camexperience){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }
        else{
            if (req.file){
                try{
                    await cloudinary.v2.uploader.destroy(campexperience.imageId);
                    var result = await cloudinary.v2.uploader.upload(req.file.path);
                    campexperience.imageId = result.public_id; 
                    campexperience.image =  result.secure_url;
                    console.log(campexperience.imageId)
                }catch(err){
                    req.flash("error", err.message);
                    res.redirect("back");
                }        
        }
                campexperience.title = req.body.campexperience.title;
                campexperience.body = req.body.campexperience.body;
                campexperience.fb = req.body.campexperience.fb;
                campexperience.ig = req.body.campexperience.ig;
                campexperience.twitter = req.body.campexperience.twitter;
                campexperience.save();
                
                
                console.log(campexperience)
                req.flash("success","Successfully Updated!");
            res.redirect("/campexperience/" + req.params.id)
        }
    });
});


//DELETE CAMP EXPERIENCE

router.delete("/campexperience/:id", function(req, res){
    campexperience.findById(req.params.id, async function(err, campexperience) {
        if(err) {
          req.flash("error", err.message);
          return res.redirect("back");
        }
        try {
            await cloudinary.v2.uploader.destroy(campexperience.imageId);
            campexperience.remove();
            req.flash('success', 'Campground deleted successfully!');
            res.redirect('/adminlol');
        } catch(err) {
            if(err) {
              req.flash("error", err.message);
              return res.redirect("back");
            }
        }
      });
})


module.exports = router;