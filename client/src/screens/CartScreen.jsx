import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';


function CartScreen(props) {

    const productId = props.match.params.id;
    ///cart/${productId}?qty={qty}
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    // on page load, check if productId, if so, dispatch addToCart action 
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    
    return (
        <div>
            <h1>Cart </h1>
            <p>
              ADD TO CART: ProductId: { productId } Qty: {qty}
            </p>
        </div>
    );
}

export default CartScreen;
