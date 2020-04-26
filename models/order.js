const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        productData: { type: Object, required: true }, 
        quantity: { type: Number, required: true }
    }],  // Array of Documents
    user: { 
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
});

// na podstawie Product mongoose zmienia na products kolekcję w bazie danych
module.exports = mongoose.model('Order', orderSchema);