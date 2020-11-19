const Event = require("../models/event");
const Org  = require("../models/org");
exports.createEvent = (req,res) => {
    req.body.org=req.profile._id;
    const event = new Event(req.body);
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
}