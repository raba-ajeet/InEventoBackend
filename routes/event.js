const express = require('express');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { createEvent } = require('../controllers/event');
const { getOrgById } = require('../controllers/org');

const router = express.Router();



router.param("orgId",getOrgById);

router.post("/:orgId/event/create",isSignedIn,isAuthenticated,createEvent);


module.exports=router;