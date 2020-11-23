const Org =require("../models/org");
const Event =require("../models/event");

exports.getOrgById = (req,res,next,id) =>{
    Org.findById(id).exec((err,org) => {
        if(err || !org) {
            return res.status(400).json({
                error:"No org found in db"
            })
        }
        req.profile=org;
        next();
    })
}

exports.getOrg =(req,res)=>{
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    req.profile.password=undefined;
    req.profile.photo=undefined;
    return res.json(req.profile);
}

exports.getEventList = (req,res) => {
    Event.find({org:req.profile._id})
    .select("-photo")
    .populate("org","_id name")
    .exec((err,event) =>{
        if(err || !event){
            return res.status(400).json({
                error:"No event is created"
            })
        }
        return res.json(event);
    })
}





