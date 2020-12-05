const express = require("express");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const {
  createBanner,
  getBannerById,
  getBannerDetails,
  getAllBanners,
  deleteBanner,
} = require("../controllers/banner");
const { getOrgById } = require("../controllers/org");

var { storage } = require("./filesupload");
const multer = require("multer");

var upload = multer({ storage: storage });

var router = express.Router();

router.param("orgId", getOrgById);
router.param("bannerId", getBannerById);

router.post(
  "/banner/create/:orgId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("bannerImage"),
  createBanner
);
router.get("/banner", getAllBanners);
router.get("/banner/:bannerId", getBannerDetails);
router.delete("/:orgId/banner/:bannerId",isSignedIn,isAuthenticated,isAdmin,deleteBanner);


module.exports = router;
