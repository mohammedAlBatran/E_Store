const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    date: Date 
    , user: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'user'
    },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;