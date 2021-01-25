const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const data = require('../seeds/seed');
const userRouter = express.Router();

//https://www.npmjs.com/package/express-async-handler/v/1.1.4
// if error, it will be passed to error handler defined in server.js 
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // remove users before inserting. it will remove all users ... be cautious to use it 
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send( { createdUsers });
})
); 

module.exports = userRouter;