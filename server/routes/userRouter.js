const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const data = require('../seeds/seed');
const {generateToken} = require('../utils/util');
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


// /api/user/signin route 
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    //check if there is user with given email
    if(user) {
        // use bcrypt to validate password
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });

            return;
        }
    }
    // 401 unauthorized 
    res.status(401).send({ message: 'Invalid email or password'});
})
); 


// /api/users/register
userRouter.post('/register', expressAsyncHandler(async ({body}, res) => {
    // console.log('register req.body:', body);
    
    //create a new user 
    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 8)
    });
    // save new user in db
    const createdUser = await user.save();

    // send user obj back
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    });
})
);


// api/users/details 
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    //get user info from User db
    const user = await User.findById(req.params.id);
    //send user obj backto front end if there is user 
    if(user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found'});
    }

}));


module.exports = userRouter;