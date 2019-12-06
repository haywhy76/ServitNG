var mongoose  = require("mongoose")

var roomatesSchema = new mongoose.Schema({
    roomatetitle: String,
    roomatebody: String,
    roomatepicture: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    created: {type: Date, default:Date.now},
});

module.exports = mongoose.model("roomates", roomatesSchema);