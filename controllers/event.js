const Event = require("../models/event");
const Org  = require("../models/org");


exports.createEvent = (req,res) => {
        req.body.org=req.profile._id;
        req.body.orgName=req.profile.name;
        req.body.orgLogo=req.profile.orgLogo;
        req.body.timing=req.body.timing ? new Date(req.body.timing) : Date.now();
        req.body.eventImage=req.file.path;
        let event = new Event(req.body);
        event.save((err,event)=> {
            if(err){
                return res.status(400).json({
                    error:"not able to create a event"
                })
            }
            Org.findByIdAndUpdate(req.profile._id,
                {"$push":{"eventList":event._id}},
                {"new":true,"upsert":"true"},
                (err1,events) =>{
                    if(err1 || !events) {
                        return res.status(400).json({
                            error:"Event List is not updated"
                        })
                    }
                    console.log("list is updated");
                }
            )
            event.createdAt=undefined;
            event.updatedAt=undefined;
            return res.json(event)
        }
        )
    
}


exports.getEventById = (req,res,next,id) => {
    Event.findById(id).exec((err,event) => {
        if(err || !event) {
            return res.status(400).json({
                error:"No Event found in db"
            })
        }
        req.event=event;
        next();
    })
}

exports.getEventDetails = (req,res) => {
    req.event.createdAt=undefined;
    req.event.updatedAt=undefined;
    res.json(req.event);
}

exports.getEventByDate = (req,res) =>{
    let given_date=new Date();
    if(req.query.timing) given_date=new Date(req.query.timing);
    let start = new Date(given_date.getFullYear(),given_date.getMonth(),given_date.getDate(),05,30,0);
    let end = new Date(given_date.getFullYear(),given_date.getMonth(),given_date.getDate(),28,59,59);
    Event.find({"timing": {"$gte": start, "$lt": end}})
    .select("-createdAt -updatedAt")
    .then((events) => {
        if(!events) {
            return res.status(400).json({
                err:"no event exist at particular date"
            })
        }
        return res.json(events);
    })
}

exports.deleteEvent = (req,res)  => {
    Event.findByIdAndDelete(req.event._id).exec((err,event)=> {
        if(err ) {
            return res.status(400).json({
                error:"Failed to delete"
            })
        }
        return res.json(event);
    })
}

exports.getAllEvents = (req,res) => {
    Event.find().select("-createdAt -updatedAt").exec((err,events)=> {
        if(err){
            return res.status(400).json({
                error:"Failed to load all events"
            })
        }
        return res.json(events);
    })
}