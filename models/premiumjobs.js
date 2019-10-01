var mongoose  = require("mongoose")

var premiumjobsSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
    
    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    created: {type: Date, default:Date.now},
});

module.exports = mongoose.model("premiumJobs", premiumjobsSchema);