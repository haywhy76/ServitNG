var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var verifiedpaymentSchema = new mongoose.Schema({
    paymentfirstname: String,
    paymentlastname: String,
    paymentemail: String,
    paymentinstitution: String,
    paymentmatric: String,
    paymentlocation: String,
    paymentnumber: String
})

verifiedpaymentSchema.plugin(passportLocalMongoose);

var payment = mongoose.model("payment", verifiedpaymentSchema);

module.exports = payment;