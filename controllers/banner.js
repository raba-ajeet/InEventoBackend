const Banner = require("../models/banner");
const formidable = require('formidable');
const fs=require('fs');

exports.createBanner = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,file)=>{
        let banner = new Banner(fields);
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File size is too Big"
                })
            }
            banner.photo.data =fs.readFileSync(file.photo.path);
            banner.photo.contentType = file.photo.type;
        }
        banner.save((err,banner)=> {
            if(err){
                return res.status(400).json({
                    err:"not able to create a event"
                })
            }
            return res.json(banner);
        })
    })
    
    
}


exports.getBannerById = (req,res,next,id) => {
    Banner.findById(id).exec((err,banner) => {
        if(err || !banner) {
            return res.status(400).json({
                error:"No Event found in db"
            })
        }
        req.banner=banner;
        next();
    })
}

exports.getBannerDetails = (req,res) => {
    req.banner.createdAt=undefined;
    req.banner.updatedAt=undefined;
    req.banner.photo=undefined;
    res.json(req.banner);
}

exports.getAllBanners = (req,res) => {
    Banner.find().select("-photo").exec((err,banners)=> {
        if(err){
            return res.status(400).json({
                error:"no banners exists"
            })
        }
        res.json({banners})
    })
}