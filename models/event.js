const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

var eventSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:100,
        require:true
    },
    description:{
        type:String
    },
    eventImage:{
        type:String
    },
    regLink:{
        type:String,
        trim:true,
    },
    timing:{
        type:Date,
        default:Date.now(),
        required:true,
    },
    orgName:{
        type:String,
        trim:true
    },
    orgLogo:{
        type:String,
        trim:true
    },
    org:{
        type:ObjectId,
        ref:"Org"
    }
},{timestamps:true});

module.exports = mongoose.model("Event",eventSchema);