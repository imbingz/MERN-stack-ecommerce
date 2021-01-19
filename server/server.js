require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 8080;

//use express middlewaree
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

//For heroku deployment - this block of codes will only run in production env
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}



app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}. http://localhost:${PORT}`);
});
