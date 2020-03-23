const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const authUser = require('./routes/auth');
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from//
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});



app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authUser);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);



mongoose.connect('mongodb://localhost/myshope', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('database server connected') })
    .catch((error) => { console.log(error.message) });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Started At Port 3000')
})   