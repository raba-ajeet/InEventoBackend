const Org = require('../models/org');
var jwt =require("jsonwebtoken");
var expressJwt = require('express-jwt');


exports.signup = (req,res) =>{
    const org = new Org(req.body);
    org.save((err,org)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err:"Not able to save user in db"
            })
        }
        return res.json({
            name:org.name,
            email:org.email,
            id:org._id
        })
    })
}


exports.signin  = (req,res) => {
    const {email,password} = req.body;
    Org.findOne({email},(err,org) => {
        if(err || !org) {
            return res.status(400).json({
                error:"user email does not exist"
            })
        }
        if(!org.authenticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            })
        }
         // create token
         const token = jwt.sign({_id:org._id},process.env.SECRET)

         res.cookie("token",token,{expire:new Date()+1})
         const {_id,name,email}=org;
         return res.json({
             token,user:{_id,name,email}
         })
    })
}


exports.signout =(req,res) => {
    res.clearCookie("token")
    res.json({
        message:"User signout Successfully"
    })
}

exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms: ['HS256']
});


exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id ;
    console.log(req.profile);
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}