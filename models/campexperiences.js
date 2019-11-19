var mongoose  = require("mongoose")

var campexperiencesSchema = new mongoose.Schema({
    campexperiencetitle: String,
    campexperiencebody: String,
    campexperiencepicture: String,
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