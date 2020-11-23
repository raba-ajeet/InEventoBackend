const express = require('express');
const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/auth');
const { createBanner, getBannerById } = require('../controllers/banner');
const { getOrgById } = require('../controllers/org');

var router = express.Router();

router.param("orgId",getOrgById);
router.param("bannerId",getBannerById);


router.post("/banner/create/:orgId",isSignedIn,isAuthenticated,isAdmin,createBanner);
router.post("/banner/:bannerId/:userId",isSignedIn,isAuthenticated,isAdmin,createBanner);




module.exports= router;