const mongoose = require('mongoose');
const User = require('../models/user')
const categorySchema = new mongoose.Schema({
    nameofcat: String
    , user: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'user'
    }

});
const Category = mongoose.model('category', categorySchema);
module.exports = Category;
