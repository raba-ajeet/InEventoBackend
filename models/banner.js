const mongoose = require('mongoose');


var bannerSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:100,
        require:true
    },
    description:{
        type:String
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    siteLink:{
        type:String,
        trim:true,
    },
},{timestamps:true});

module.exports = mongoose.model("Banner",bannerSchema);