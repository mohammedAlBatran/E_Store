const express = require('express');
const Order = require('../models/order');
const authMiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const router = express.Router();

router.get('/', [authMiddleware, adminmiddleware], async (req, res) => {
    try {
        const result = await Order.find()
            .populate('product', '-_id name price category ')
            .populate('user', '-_id name')
            .select('-_id')
        res.send(result);
    } catch (error) {
        res.status(400).send({ message: 'Error ' + error.message })
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const neworder = new Order({
            date: new Date().getTime()
            , user: req.body.user
            , product: req.body.product
        });
        const result = await neworder.save()
        if (result) {
            res.send(result)
        } else {
            res.status(404).send({ message: 'no order saved' })
        }

    } catch (error) {
        res.status(400).send({ message: 'Error ' + error.message })

    }
});


module.exports = router;

