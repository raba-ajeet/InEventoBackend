require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

//Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// routes

const authRoutes = require('./routes/auth');
const orgRoutes = require('./routes/org');
const eventRoutes = require('./routes/event');

// DB connection
mongoose.connect(process.env.DATABASE,{
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


app.get("/", (req,res)=>{
    return res.send("hello there how are you");
})
 

app.listen(port, ()=>{
    console.log("server is up and runing\n");
});
