var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String, 
    password: String,
    expire_at: {type: Date, default: Date.now, expires: 259200} ,
    created: {type: Date, default:Date.now}
})



UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;


