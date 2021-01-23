import React from 'react';

function CartScreen(props) {

    const productId = props.match.params.id;

    ///cart/${productId}?qty={qty}
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

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
