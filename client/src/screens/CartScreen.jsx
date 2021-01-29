import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';


function CartScreen(props) {
    
    // check if user has already signed in, if not, redirect user to signin 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin');
    }

    const productId = props.match.params.id;
    ///cart/${productId}?qty={qty}
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    //get cart and cartItem from redux store using useSelector
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart; 
    

    // on page load, check if productId, if so, dispatch addToCart action 
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    
    //delete cartItem action
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    //After checkout btn is clicked, go to signin page and then shipping page
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };
    
    return (
        <div className='top row'>
            <div className="col-2">
                <h1>Shopping Cart </h1>
                {
                    cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to='/'> Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {
                                cartItems.map(item => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className='small'/>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div>
                                                <select value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                                    { [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={ x + 1 } value={ x + 1 }>
                                                            {x + 1 }
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>${ item.price }</div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={ () => removeFromCartHandler(item.product) }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} itmes) 
                                : $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type='button'
                                className='primary block'
                                onClick={checkoutHandler}
                                disabled = {cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
