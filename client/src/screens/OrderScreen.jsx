import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
    // Get the orderId from params 
    const orderId = props.match.params.id;

    //get orderDetails from redux store
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    //getorderPay from redux store
    const orderPay = useSelector((state) => state.orderPay);
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;
    //set PayPal REST API info 
    //https://developer.paypal.com/docs/checkout/reference/server-integration/setup-sdk/
    const [ sdkReady, setSdkReady ] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        // get Paypal clientId from backend 
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            //create a paypal script element 
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            //onload happens when the script is loaded to the browser
            script.onload = () => {
                setSdkReady(true);
            };
            //add the script to body as the last child 
            document.body.appendChild(script);
        };

        // console.log(order._id);
        // dispatch(detailsOrder(orderId));

        // disptach the orderDetail action if there is NO orderId, or payment is not successful, or order._id not equals to orderId
        if (!order._id || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
        //check if payment method has been loaded, if not, call addPayPalScript function
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, orderId, order, successPay]);

    // paypal payment - paymentResult is an obj returned from paypal
    const successPaymentHandler = (paymentResult) => {
        // console.log('paymentResult:', paymentResult);
        //dispatch payOrder action 
        dispatch(payOrder(order, paymentResult));
      
    };



    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{ error }</MessageBox>
    ) : (
        <div>
            <h1>Order { order._id }</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shippring</h2>
                                <p>
                                    <strong>Name:</strong> { order.shippingAddress.fullName } <br />
                                    <strong>Address: </strong> { order.shippingAddress.address },
                                    { order.shippingAddress.city },{ ' ' }
                                    { order.shippingAddress.postalCode },
                                    { order.shippingAddress.country }
                                </p>
                                { order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Delivered at {order.deliveredAt }
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                ) }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> { order.paymentMethod }
                                </p>
                                { order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt }
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                ) }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    { order.orderItems.map((item) => (
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
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${ order.itemsPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${ order.shippingPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${ order.taxPrice.toFixed(2) }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${ order.totalPrice.toFixed(2) }</strong>
                                    </div>
                                </div>
                            </li>
                            { !order.isPaid && (
                                <li>
                                    {!sdkReady ? (
                                        <LoadingBox />
                                    ) : (
                                        <>  
                                            {
                                                loadingPay && <LoadingBox />
                                            }
                                            {
                                                errorPay && <MessageBox variant='danger'>{errorPay}</ MessageBox>
                                            }   
                                            <PayPalButton
                                                amount={ order.totalPrice }
                                                onSuccess={ successPaymentHandler }
                                            ></PayPalButton>
                                        </>
                                    ) }
                                </li>
                            ) }
                            
      
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
