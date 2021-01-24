import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

// when we define an action function, it should return an async function with dispatch 
// disptach and getState are redux-thunk functions to get access to redux store
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    // data (product) is deconstructed from axios return data
    const { data } = await axios.get(`/api/products/${productId}`);

    //using product data to dispatch 
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    });

    //after adding items to cart, get cartItems from redux store using getState and store data in localStorage
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};