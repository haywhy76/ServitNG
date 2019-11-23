var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var verifiedSchema = new mongoose.Schema({
    verifiedfirstname: String,
    verifiedlastname: String,
    verifiedemail: String,
    verifiedinstitution: String,
    verifiedmatric: String,
    verifiedlocation: String,
    verifiednumber: String
})

verifiedSchema.plugin(passportLocalMongoose);

var verified = mongoose.model("verified", verifiedSchema);

module.exports = verified;