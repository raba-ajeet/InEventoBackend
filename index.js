require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();





app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


//Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


// routes

const authRoutes = require('./routes/auth');
const orgRoutes = require('./routes/org');
const eventRoutes = require('./routes/event');
const bannerRoutes = require('./routes/banner');

// DB connection
mongoose.connect("mongodb+srv://admin:admin1234@cluster0.s298g.mongodb.net/inevento?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=> {
    console.log("Db is connected")
}).catch( () => {
    console.log("Db is disconnected")
})

app.use("/api",authRoutes);
app.use("/api",orgRoutes);
app.use("/api",eventRoutes);
app.use("/api",bannerRoutes);


app.get("/", (req,res)=>{
    return res.send("hello there how are you");
})
 

app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT);
    console.log("server is up and runing\n");
});
