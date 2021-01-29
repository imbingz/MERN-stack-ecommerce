import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentMethodScreen(props) {
    // set condition for paymentMethodScreen - only after user has filled in shipping address 
    //  get shippingAddress data from redux store
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    //if user has not filled shippingaddress, redirect to shippingscreen
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }

    // set states 
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    //use dispatch
    const dispatch = useDispatch();

    //submit payment handler 
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch paymnentMethod action 
        dispatch(savePaymentMethod(paymentMethod));
        // redirect user to placeOrder screen
        props.history.push('/placeorder');
    };


    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio"
                            name="paymentMethod"
                            id="paypal"
                            value="PayPal"
                            required 
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div>
                        <input type="radio"
                            name="paymentMethod"
                            id="stripe"
                            value="Stripe"
                            required 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
              
                    <button type="submit" className="primary">Continue</button>
                    
                </div>
            </form>
        </div>
    );
}

export default PaymentMethodScreen;
