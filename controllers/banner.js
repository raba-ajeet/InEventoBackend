const Banner = require("../models/banner");


exports.createBanner = (req,res) => {
    req.body.bannerImage=req.file.path;
    const banner=new Banner(req.body);
    console.log(req.file);
    banner.save((err,banner)=> {
        if(err){
            return res.status(400).json({
                error:"not able to create a event"
            })
        }
        banner.createAt=undefined;
        banner.updatedAt=undefined;
        return res.json(banner);
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
    res.json(req.banner);
}

exports.getAllBanners = (req,res) => {
    Banner.find().select("-createdAt -updatedAt").exec((err,banners)=> {
        if(err){
            return res.status(400).json({
                error:"no banners exists"
            })
        }
        res.json({banners})
    })
}


exports.deleteBanner = (req,res)  => {
    Banner.findByIdAndDelete(req.banner._id).exec((err,banner)=> {
        if(err ) {
            return res.status(400).json({
                error:"Failed to delete"
            })
        }
        return res.json(banner);
    })
}
