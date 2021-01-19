require('dotenv').config();
const express = require('express');
const path = require('path');
//get the product seeds data 
const data = require('./seeds/products');
const app = express();


const PORT = process.env.PORT || 8080;

//use express middlewaree
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);


// temp product api route 
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

//test server route 
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//For heroku deployment - this block of codes will only run in production env
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}


//server 
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}. http://localhost:${PORT}`);
});
