const Event = require("../models/event");
const Org  = require("../models/org");
const formidable = require('formidable');
const fs=require('fs');

exports.createEvent = (req,res) => {
    req.body.org=req.profile._id;
    let form = formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,file)=>{
        let event = new Event(fields);
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File size is too Big"
                })
            }
            event.photo.data =fs.readFileSync(file.photo.path);
            event.photo.contentType = file.photo.type;
        }
        event.save((err,event)=> {
            if(err){
                return res.status(400).json({
                    err:"not able to create a event"
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
            return res.json({
                name:event.name,
                id:event._id,
                timing:event.timing
            })
        })
    })
    
    
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
    let given_date=new Date(req.body.timing);
    let start = new Date(given_date.getFullYear(),given_date.getMonth(),given_date.getDate(),05,30,0);
    let end = new Date(given_date.getFullYear(),given_date.getMonth(),given_date.getDate(),28,59,59);
    Event.find({"timing": {"$gte": start, "$lt": end}})
    .then((events) => {
        if(!events) {
            return res.status(400).json({
                err:"no event exist at particular date"
            })
        }
        return res.json(events);
    })
}