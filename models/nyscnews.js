var mongoose  = require("mongoose")

var nyscnewsSchema = new mongoose.Schema({
    newstitle: String,
    newsbody: String,
    newspicture: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {type: Date, default:Date.now},
    nyscnewscomments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"nyscnewscomments"
    }]
});

module.exports = mongoose.model("nyscNews", nyscnewsSchema);