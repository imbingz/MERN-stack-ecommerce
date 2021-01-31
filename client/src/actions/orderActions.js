import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants';
import { CART_EMPTY } from '../constants/cartConstants';

// use redux-thunk dispatch, getState methods 
export const createOrder = order => async (dispatch, getState ) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order});
    try {
        //get userinfo from redux store using getState that returns the whole redux store 
        const { userSignin: {userInfo}} = getState();
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        // console.log('userInfo', userInfo);
        
        dispatch({type:ORDER_CREATE_SUCCESS, payload: data.order });
        // remove all items from shopping cart and clear local storage after clicking placeOrder button and receiving data from backend 
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};
