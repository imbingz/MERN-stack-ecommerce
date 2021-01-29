import React from 'react';

function CheckoutSteps(props) {
    return (
        <div className='row checkout-steps'>
            <div className={props.steps1 ? 'active' : ''}>Sign In</div>
            <div className={props.steps2 ? 'active' : ''}>Shipping</div>
            <div className={props.steps3 ? 'active' : ''}>Payment</div>
            <div className={props.steps4 ? 'active' : ''}>Place Order</div>
        </div>
    );
}

export default CheckoutSteps;
