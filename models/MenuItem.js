const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Person'
        
    //   },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
// menuItemSchema.path('user').ref('Person'); 

module.exports = MenuItem;