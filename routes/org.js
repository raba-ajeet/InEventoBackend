
const express = require('express');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getOrgById, getOrg, getEventList } = require('../controllers/org');

const router =express.Router();


router.param("orgId",getOrgById);

router.get("/org/:orgId",isSignedIn,isAuthenticated,getOrg);

router.get("/events/org/:orgId",isSignedIn,isAuthenticated,getEventList);

module.exports =router;