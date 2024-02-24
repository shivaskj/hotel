const mongoose = require('mongoose');

//person schema defining
const personSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number
        },
        work: {
            type: String,
            enum: ['chef','waiter','manager'],
            required:true
        },
        mobile: {
            type: String
        },
        email: {
            type: String,
            required:true,
            unique:true
        },
        address:{
            type: String,
        },
        salary:{
            type: Number,
            required:true
        }

    }
);

// create person mpdel 
// I believe you can force the collection name to be whatever you’d like.
// mongoose.model('Model name', schema, 'Collection name');

const Person=mongoose.model('Person',personSchema, 'staff');
module.exports=Person;