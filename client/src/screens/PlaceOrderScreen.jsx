import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';


function PlaceOrderScreen(props) {
    // get the cart data from redux store
    const cart = useSelector(state => state.cart);

    //check if user has entered payment info, if not ,redirect to payment 
    if (!cart.paymentMethod){
        props.history.push('/payment');
    }

    //get order info from redux store using useSelector 
    const orderCreate = useSelector((state) => state.orderCreate);
    //deconstruct orderCreate for rendering 
    const { loading, success, error, order } = orderCreate;

    // Order summary calculations - price, shipping, tax, total
    // convert price to 2 decimal number (toFixed returns String)
    const toPrice = (price) => Number(price.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    //placeOrder Handler 
    const placeOrderHandler = () => {
    //dispatch placeOrder action 
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

    };
  
    // if order is successful, redirect user to orderDetails screen and reset order {}
    useEffect (() => {
        if(success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET});
        }
    }, [success, order, props.history, dispatch]);

    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3 steps4/>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong> { cart.shippingAddress.address }
                                    { cart.shippingAddress.city }, { cart.shippingAddress.zipcode }, { cart.shippingAddress.country }
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    { cart.cartItems.map((item) => (
                                        <li key={ item.product }>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={ item.image }
                                                        alt={ item.name }
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={ `/product/${item.product}` }>
                                                        { item.name }
                                                    </Link>
                                                </div>

                                                <div>
                                                    { item.qty } x ${ item.price } = ${ item.qty * item.price }
                                                </div>
                                            </div>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2> Order Summary </h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${ cart.itemsPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${ cart.shippingPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${ cart.taxPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${ cart.totalPrice.toFixed(2) }</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={ placeOrderHandler }
                                    className="primary block"
                                    disabled={ cart.cartItems.length === 0 }
                                >
                                Place Order
                                </button>
                            </li>
                            {
                                loading && <LoadingBox />
                            }
                            {
                                error && <MessageBox variant='danger'>{error} </MessageBox>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PlaceOrderScreen;
