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
    image:{
        data:Buffer,
        contentType:String,
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
    org:{
        type:ObjectId,
        ref:"Org"
    }
},{timestamps:true});

module.exports = mongoose.model("Event",eventSchema);