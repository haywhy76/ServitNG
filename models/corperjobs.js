var mongoose  = require("mongoose")

var corperjobsSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
    quantity: Number,
    allowance: Number,
    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    created: {type: Date, default:Date.now},
});

module.exports = mongoose.model("corperJobs", corperjobsSchema);