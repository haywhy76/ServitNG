var mongoose  = require("mongoose")

var forumpostSchema = new mongoose.Schema({
    title: String,
    tags: String,
    bodymarkdown: String,
    location:String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    image: String,
    created: {type: Date, default:Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongoose.model("Qsforum", forumpostSchema);