var mongoose  = require("mongoose")

var campexperiencesSchema = new mongoose.Schema({
    title: String,
    body: String,
    fb: String,
    ig: String,
    image: String,
   imageId: String,
    twitter: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    created: {type: Date, default:Date.now},
});

module.exports = mongoose.model("campExperiences", campexperiencesSchema);