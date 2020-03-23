//here we learn how to make registeration
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authmiddleware = require('../middleware/authmiddleware');
const router = express.Router();
router.post('/', async (req, res) => {
    // this if condition to sure that the email do not repeated again
    let emailuser = await User.findOne({ email: req.body.email })
    let username = await User.findOne({ name: req.body.name })
    if (emailuser) {
        res.status(400).send({ message: 'email already Exists' })
    } else if (username) {
        res.status(400).send({ message: 'Username already Exists' })
    }
    else {
        newUser = new User({
            name: req.body.name
            , gender: req.body.gender
            , email: req.body.email
            , password: req.body.password
            , isAdmin: req.body.isAdmin
        })
        const hashPassword = await bcrypt.hash(newUser.password, 10)
        newUser.password = hashPassword
        const savedUser = await newUser.save();
        const token = newUser.genToken();
        res.header('x-auth-token', token).send({ message: 'you are logged in ...', token: token })
        //x-auth-token is naming convention for this field 
    }

});

//here i want to make a profile page for user contains all data of user 

router.get('/me', authmiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user)
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router;