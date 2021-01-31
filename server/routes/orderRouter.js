const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { isAuth } = require('../utils/util');
const orderRouter = express.Router();



// /apil/orders/
orderRouter.post('/', isAuth, expressAsyncHandler(async({ body }, res) => {
    if(body.orderItems.length === 0) {
        return res.status(400).send({message: 'Cart is empty'});
    } 

    const order = new Order({
        orderItems: body.orderItems,
        shippingAddress: body.shippingAddress,
        paymentMethod: body.paymentMethod,
        itemsPrice: body.itemsPrice,
        shippingPrice: body.shippingPrice,
        taxPrice: body.taxPrice,
        totalPrice: body.totalPrice,
        user: req.user._id
    });

    const createdOrder = await order.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
}));

module.exports = orderRouter;