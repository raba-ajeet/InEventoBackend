var express =require("express");
const { signup, signin, signout,isSignedIn,isAuthenticated } = require("../controllers/auth");
var router = express.Router();


router.post("/signup",signup);
router.post("/signin", signin);
router.get("/signout",signout);



router.get("/testroute",isSignedIn,isAuthenticated, (req,res) => {
    res.json(req.auth);
});

module.exports=router;