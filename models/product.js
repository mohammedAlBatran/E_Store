const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String
    , price: Number
    , category: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'category'
    }
    , image: String

});
const Product = mongoose.model('product', productSchema);
module.exports = Product;