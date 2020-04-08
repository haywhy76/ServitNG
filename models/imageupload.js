var mongoose  = require("mongoose");

var imageUploadSchema = mongoose.Schema({
    profilepicture: string,
    
   
});

module.exports = mongoose.model("imageupload", imageUploadSchema);