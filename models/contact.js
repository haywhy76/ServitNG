var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

ContactSchema.plugin(passportLocalMongoose);

var Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;