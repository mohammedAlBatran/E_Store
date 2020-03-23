const express = require('express');
const Category = require('../models/category');
const Product = require('../models/product')
const authMiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const router = express.Router();


router.get('/:id', async (req, res) => {
    try {
        const result = Category.findById(req.params.id)
            .populate('user', '-_id name')
            .select('-_id')
        if (result) {
            res.send(result);
        }
    } catch (error) {

    }
})
router.get('/', async (req, res) => {
    try {
        const result = await Category.find()
            .populate('user', '-_id name')

        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'no data found ' });
        }

    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
});

router.post('/', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const newCategory = new Category({
            nameofcat: req.body.nameofcat
            , user: req.body.user

        });
        const result = await newCategory.save()
        if (result) {
            let data = await Category.findById(result._id)
                .populate('user', '-_id name');

            res.send(data);
        } else {
            res.status(404).send({ message: 'no data saved' })
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }

});

router.delete('/:id', [authMiddleware, adminmiddleware], async (req, res) => {
    const productRef = Product.findById({ category: req.params.id })
    if (productRef == false) {
        Category.findByIdAndDelete({ _id: req.params.id })
            .then(() => {
                res.send({ message: "data already deleted" })
            })
            .catch(error => {
                res.send({ message: error.message })
            });

    } else {
        res.send({ message: "you can not delete this ,it is a reference to Products" })
    }
})



module.exports = router;