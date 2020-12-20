const Org = require('../models/org');
var jwt =require("jsonwebtoken");
var expressJwt = require('express-jwt');

const SECRET="inevento";


exports.signup = (req,res) => {
    if(req.file ) req.body.orgLogo=req.file.path;
    let org = new Org(req.body);
    org.save((err,org)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:"Not able to save user in db"
            })
        }
        org.createdAt=undefined;
        org.updatedAt=undefined;
        return res.json(org)
    })
}


exports.signin  = (req,res) => {
    const {email,password} = req.body;
    Org.findOne({email},(err,org) => {
        if(err || !org) {
            return res.status(400).json({
                errror:"user email does not exist"
            })
        }
        if(!org.authenticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            })
        }
         // create token
         const token = jwt.sign({_id:org._id},SECRET)
        console.log("some one is making successful request");
         res.cookie("token",token,{expire:new Date()+1})
         const {_id,name,email,role}=org;
         return res.json({
             token,user:{_id,name,email,role}
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


exports.isAdmin = (req,res,next) => {
    if(req.profile.role==0){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}
