const mongoose = require('mongoose');

var orgSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        maxlength:32,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    orgLogo:{
        type:String
    },
    eventList:{
        type:Array,
        default:[],
    },
    role:{
        type:String,
        default:0
    }

},{timestamps:true});


orgSchema.methods = {
    authenticate: function (password) {
        return this.password==password;
    }
}

module.exports= mongoose.model("Org",orgSchema);