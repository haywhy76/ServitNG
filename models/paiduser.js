var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var paidUserSchema = new mongoose.Schema({
    username: String, 
    email: String, 
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
   
})



paidUserSchema.plugin(passportLocalMongoose);

var paidUser = mongoose.model("paidUser", paidUserSchema);
module.exports = paidUser;


