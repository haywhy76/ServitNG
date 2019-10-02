var express    = require("express"),
    app        = express(),
    path = require('path'),
    async = require('async'),
    nodemailer = require('nodemailer'),
    flash     =  require("connect-flash"),
    methodOverride = require("method-override");
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser");
    Forumpost = require("./models/qsforum")
    Comment = require("./models/comment"),
    internjob = require("./models/internjobs")
    internjob = require("./models/corperjobs")
    Setting = require("./models/settings")
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");
    path = require("path");
    crypto = require("crypto");
    multer = require("multer");
    GridFsStorage = require("multer-gridfs-storage");
    Grid = require("gridfs-stream");
   

//requiring routes
//seedDB();
var commentRoutes = require("./routes/comments"),
    tagsRoutes = require("./routes/tags"),
    keylinksRoutes = require("./routes/keylinks"),
    
    premiumJobRoutes = require("./routes/premiumjobs"),
    indexRoutes = require("./routes/index"),
    jobRoutes = require("./routes/jobs"),
    forgotRoutes = require("./routes/forgot"),
    resetRoutes = require("./routes/forgot"),
    settingsRoutes = require("./routes/settings")
    companyRoutes = require("./routes/company")
    positionRoutes = require("./routes/position")
    locationRoutes = require("./routes/location")
   
    imageUploadRoutes = require("./routes/imageupload")
   
    faqRoutes = require("./routes/faq")
    contactRoutes = require("./routes/contact")


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"))
app.use(flash());
app.use(bodyParser.json());


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Our very own community",
    resave: false,
    saveUnintialized: false
}))

 app.use(passport.initialize());
 app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));



 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use( tagsRoutes);
app.use( keylinksRoutes);
app.use(jobRoutes);
app.use(settingsRoutes);
app.use(companyRoutes);
app.use(positionRoutes);
app.use(premiumJobRoutes);
app.use(locationRoutes);
app.use(resetRoutes);
app.use(forgotRoutes);
app.use(imageUploadRoutes);


app.use(faqRoutes);
app.use(contactRoutes);




mongoose.connect('mongodb+srv://itandppa:itandppa@clusteritandppa-ffmfj.mongodb.net/test?retryWrites=true&w=majority')







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The Server Has Been Triggered On Port ${ PORT }`);
});
