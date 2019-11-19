var express    = require("express"),
    app        = express(),
    path = require('path'),
    async = require('async'),
    nodemailer = require('nodemailer'),
    flash     =  require("connect-flash"),
    methodOverride = require("method-override");
    mongoose   = require("mongoose"),
    multer = require('multer'),
    GridFsStorage = require('multer-gridfs-storage'),
    url = 'mongodb+srv://itandppa:itandppa@clusteritandppa-ffmfj.mongodb.net/test?retryWrites=true&w=majority',
    storage = new GridFsStorage({ url }),
    upload = multer({ storage }),
    bodyParser = require("body-parser");
    Forumpost = require("./models/qsforum")
    Comment = require("./models/nyscnewscomments"),
    internjob = require("./models/internjobs")
    Comment   = require("./models/nyscnewscomments"),
    internjob = require("./models/corperjobs")
    Setting = require("./models/settings")
    nyscnews = require("./models/nyscnews")
    roomates = require("./models/roomates")
    campexperiences = require("./models/campexperiences")
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");
    path = require("path");
    crypto = require("crypto");
    multer = require("multer");
    GridFsStorage = require("multer-gridfs-storage");
    Grid = require("gridfs-stream");
    conn = mongoose.createConnection(url)
    GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

//requiring routes
//seedDB();

  var keylinksRoutes = require("./routes/keylinks"),
    premiumJobRoutes = require("./routes/premiumjobs"),
    indexRoutes = require("./routes/index"),
    jobRoutes = require("./routes/jobs"),
    forgotRoutes = require("./routes/forgot"),
    resetRoutes = require("./routes/forgot"),
    settingsRoutes = require("./routes/settings")
    findyourwaytocampRoutes = require("./routes/findyourwaytocamp")
    mylistingRoutes = require("./routes/mylistings")
    nyscNewsRoutes = require("./routes/nyscnews")
    roomatesRoutes = require("./routes/roomates")
    nyscnewscommentsRoutes = require("./routes/nyscnewscomments")
    getstartedRoutes = require("./routes/getstarted")
    imageUploadRoutes = require("./routes/imageupload")
    campExperienceRoutes = require("./routes/campexperiences")

   
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

   
passport.use(new GoogleStrategy({
    consumerKey: "672195255514-gi76bin77pej54csltbmbfha746t3p90.apps.googleusercontent.com",
    consumerSecret: "U_Yb-Zttws3wCPd35sXh_Gmx",
    callbackURL: "https://www.servitng.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });




 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use("/", indexRoutes);
app.use( keylinksRoutes);
app.use(jobRoutes);
app.use(settingsRoutes);
app.use(premiumJobRoutes);
app.use(resetRoutes);
app.use(forgotRoutes);
app.use(imageUploadRoutes);
app.use(mylistingRoutes);
app.use(faqRoutes);
app.use(contactRoutes);
app.use(nyscNewsRoutes);
app.use(roomatesRoutes);
app.use(getstartedRoutes);
app.use( nyscnewscommentsRoutes);
app.use(campExperienceRoutes);
app.use(findyourwaytocampRoutes);





mongoose.connect('mongodb+srv://itandppa:itandppa@clusteritandppa-ffmfj.mongodb.net/test?retryWrites=true&w=majority')


// let gfs

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo)
//   gfs.collection('uploads')
//   console.log('Connection Successful')
// })





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The Server Has Been Triggered On Port ${ PORT }`);
});
