const express = require('express');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { createEvent, getEventByDate, getEventById, getEventDetails } = require('../controllers/event');
const { getOrgById } = require('../controllers/org');

const router = express.Router();



router.param("orgId",getOrgById);
router.param("eventId",getEventById);
router.post("/:orgId/event/create",isSignedIn,isAuthenticated,createEvent);

router.get("/events/date",getEventByDate);

router.get("/events/:eventId",getEventDetails);

module.exports=router;