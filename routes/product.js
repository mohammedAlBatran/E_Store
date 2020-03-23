const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user')

const authMiddleware = require('../middleware/authmiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await Product.find()
            .populate('category', '-_id nameofcat')

        res.send(result);
    } catch (error) {
        res.status(400).send({ message: 'Error' + error.message })
    }
});
async function returnId() {
    const result = await Category.find()
        .select('_id')
    return result
}

router.get('/category', async (req, res) => {
    try {
        var x = await returnId()
        console.log(x)
        var last = [];

        for (let i = 0; i < x.length; i++) {
            let result = await Product.find({ category: x[i] }).limit(3);
            last = last.concat(result);
        }
        console.log(last);
        res.send(last)



    } catch (error) {
        res.status(400).send({ message: 'Error  ' + error.message })
    }
})
router.get('/:id', async (req, res) => {

    try {
        const result = await Product.findById(req.params.id)
            .populate('category', '-_id nameofcat')
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'no data found ' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Bad Request : ' + error.message });
    };
});


router.post('/', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const newProduct = new Product({
            name: req.body.name
            , price: req.body.price
            , category: req.body.category
            , image: req.body.image
        });
        const result = await newProduct.save()
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'no data saved' })
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }


});




router.put('/:id', [authMiddleware, adminmiddleware], async (req, res) => {

    try {
        const selectedProduct = await Product.findById(req.params.id)
        if (selectedProduct) {
            selectedProduct.name = req.body.name;
            selectedProduct.image = req.body.image;
            selectedProduct.price = req.body.price;
            selectedProduct.category = req.body.category;
            const updatedProduct = await selectedProduct.save()
            // console.log('helloooooooo')//
            res.send(updatedProduct);
        } else {
            res.status(404).send({ message: 'no product found' });
        }

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


router.delete('/:id', [authMiddleware, adminmiddleware], (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({ message: 'data already deleted' })
        })
        .catch((error) => {
            res.status(400).send(error.message)
        });

});


module.exports = router;