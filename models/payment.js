var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var paymentSchema = new mongoose.Schema({
    paymentfirstname: String,
    paymentlastname: String,
    paymentemail: String,
    paymentinstitution: String,
    paymentmatric: String,
    paymentlocation: String
})

paymentSchema.plugin(passportLocalMongoose);

var payment = mongoose.model("payment", paymentSchema);

module.exports = payment;