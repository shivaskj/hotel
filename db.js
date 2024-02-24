const mongoose = require('mongoose');
require('dotenv').config();

//define the mongodb connectio url
//const mongoURL='mongodb://localhost:27017/restaurant'
const mongoURL= process.env.DB_URL;
//set up mongodb connection
mongoose.connect(mongoURL)

//default connection
const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connect m event hua');
});

db.on('error',(err)=>{
    console.log('connection error event hua :',err);
});

db.on('disconnected',()=>{
    console.log('disconnection event hua');
});

//exporting

module.exports=db;