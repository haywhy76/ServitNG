var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var adminUserSchema = new mongoose.Schema({
    adminusername: String, 
    adminpassword: String,
    created: {type: Date, default:Date.now}
})



adminUserSchema.plugin(passportLocalMongoose);

var adminUser = mongoose.model("adminUser", adminUserSchema);
module.exports = adminUser;


