const express = require('express');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { createEvent, getEventByDate, getEventById, getEventDetails, deleteEvent, getAllEvents } = require('../controllers/event');
const { getOrgById } = require('../controllers/org');
const router = express.Router();


var {storage} = require('./filesupload');
const multer = require('multer');

var upload = multer({ storage: storage });




router.param("orgId",getOrgById);
router.param("eventId",getEventById);
router.post("/:orgId/event/create",isSignedIn,isAuthenticated,upload.single('eventImage'),createEvent);

router.delete("/:orgId/event/:eventId",isSignedIn,isAuthenticated,deleteEvent);

router.get("/events/date",getEventByDate);

router.get("/events/:eventId",getEventDetails);
router.get("/events",getAllEvents);

module.exports=router;