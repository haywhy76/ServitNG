var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var SubscribeSchema = new mongoose.Schema({
    email: String
})

SubscribeSchema.plugin(passportLocalMongoose);

var Subscriber = mongoose.model("Subscriber", SubscribeSchema);
module.exports = Subscriber;