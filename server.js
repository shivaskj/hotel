const express=require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT= process.env.PORT || 3000;

require('dotenv').config();
const db=require('./db');

const Person= require('./models/Person')

//home 
app.get('/',  (req,res)=> {
    res.send("swagat hai aapka , how can i help")   
})


//import the routes
const personRoutes = require('./routes/personRoutes');
// Use the routers
app.use('/person', personRoutes);


//listenin on port


app.listen(3000, ()=>{
    console.log('3000 port sun raha hai')
})