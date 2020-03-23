const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const config = require('config'); //
const userSchema = new mongoose.Schema({
    name: String
    , gender: String
    , email: String
    , password: String
    , isAdmin: Boolean

});

// set mySecVariable='meanstack' in terminal
userSchema.methods.genToken = function () {
    //const token = jwt.sign({ _id: this._id, email: this.email, isAdmin: this.isAdmin }, config.get("secretkey"));
    const token = jwt.sign({ _id: this._id, email: this.email, isAdmin: this.isAdmin, name: this.name }, 'meanstack');
    return token;
}
const User = mongoose.model('user', userSchema);

module.exports = User;