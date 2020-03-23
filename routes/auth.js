// here we learn how to login 
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
// At any api we request & response in json so at res.send i send message in json
router.post('/', async (req, res) => {
    try {
        const loggedUser = await User.findOne({ email: req.body.email }); //  return the user
        if (loggedUser) {
            const validPass = await bcrypt.compare(req.body.password, loggedUser.password);
            if (validPass) {
                const token = loggedUser.genToken()
                res.header('x-auth-token', token).send({ message: 'you are logged in ...', token: token });
            } else {
                res.status(400).send({ message: 'invalid User Or Password' })
            }
        } else {
            res.status(400).send({ message: 'invalid User Or Password' })
        }

    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router
