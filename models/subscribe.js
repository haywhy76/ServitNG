var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var SubscribeSchema = new mongoose.Schema({
    email: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
})

SubscribeSchema.plugin(passportLocalMongoose);

var Subscriber = mongoose.model("Subscriber", SubscribeSchema);
module.exports = Subscriber;