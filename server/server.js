require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
//get the product seeds data 
const data = require('./seeds/seed');
const app = express();

//db connect 
// console.log(process.env.MONGODB_URI );
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const PORT = process.env.PORT || 8080;

//use express middlewaree
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use serRouter
app.use('/api/users', userRouter);


// temp product api/product route 
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find( x => x._id === req.params.id);
    //check condition
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
});


// temp product api route 
app.get('/api/products', (req, res) => {
    res.send(data.products);
});


// //test server route 
// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

//For heroku deployment - this block of codes will only run in production env
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

//server 
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}. http://localhost:${PORT}`);
});
