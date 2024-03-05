const express = require('express');
const router = express.Router();
const Person= require('../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
//post or create person
router.post('/signUp',async(req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data);

        const response=await newPerson.save();
        console.log("data save ho gaya");

        const payload = {
            id: response.id,
            email: response.email
        }
        console.log(JSON.stringify(payload)); //printing payload on terminal

        const token=generateToken(payload);
        console.log("Token is : ", token);   //printing token on terminal

        //res.status(200).json(response);
        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    } 
})

// Login Route
// router.post('/signIn', async(req, res) => {
//     try{
//         // Extract username and password from request body
//         const {enteredemail, enteredpassword} = req.body;

//         // Find the user by username
//         const r = await Person.findOne({email: enteredemail});

//         // If user does not exist or password does not match, return error
//         if( !r || !(await r.comparePassword(enteredpassword))){
//             return res.status(401).json({error: 'Invalid username or password'});
//         }

//         // generate Token 
//         const payload = {
//             id: r.id,
//             email: r.email
//         }
//         const token = generateToken(payload);

//         // resturn token as response
//         res.json({token})
//     }catch(err){
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// Login Route
router.post('/signIn', async(req, res) => {
    try{
        // Extract username and password from request body
        const {email, password} = req.body; 
        // why we cant write 
        // const {enteredemail, enteredpassword} = req.body;

        // Find the user by username
        const r = await Person.findOne({email: email});

        // If user does not exist or password does not match, return error
        if( !r || !(await r.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: r.id,
            email: r.email
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET method to get the person by role
router.get('/:w', async(req, res)=>{
    try{
        const workType = req.params.w; // // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//put or update by using id passed in req url
router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//exporting router
module.exports=router;