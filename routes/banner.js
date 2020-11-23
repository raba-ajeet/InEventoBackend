const express = require('express');
const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/auth');
const { createBanner, getBannerById, getBannerDetails,getAllBanners } = require('../controllers/banner');
const { getOrgById } = require('../controllers/org');

var router = express.Router();

router.param("orgId",getOrgById);
router.param("bannerId",getBannerById);


router.post("/banner/create/:orgId",isSignedIn,isAuthenticated,isAdmin,createBanner);
router.get("/banner",getAllBanners);
router.get("/banner/:bannerId",getBannerDetails);




module.exports= router;