var mongoose  = require("mongoose")

var settingsSchema = new mongoose.Schema({
    fullname: String,
    location: String,
    email: String,
    phonenumber: String,
    username: String,
    facebook: String,
    twitter: String,
    instagram: String,
    summary: String,
    password: String,
    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    created: {type: Date, default:Date.now},
});

module.exports = mongoose.model("settings", settingsSchema);