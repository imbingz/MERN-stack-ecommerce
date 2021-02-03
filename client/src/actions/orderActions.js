import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_SUCCESS } from '../constants/orderConstants';
import { CART_EMPTY } from '../constants/cartConstants';

// use redux-thunk dispatch, getState methods 
export const createOrder = (order) => async (dispatch, getState ) => {
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


// OrderDetail action 
export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId});
    //get userInfo from redux store
    const { userSignin: { userInfo }} = getState();

    try{ 
        //get the order-detail data from API request 
        // need to send the optional header token info for the backend authorization
        const { data } = await axios.get(
            `/api/orders/${orderId}`, 
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
        // disptach the data 
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message});
    }
};

//PayOrder action 
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult }});
    //get userInfo from redux store
    const { userSignin: { userInfo }} = getState();

    try{ 
        //get the order-detail data from API request 
        // need to send the optional header token info for the backend authorization
        //updated order with payment result from paypal api 
        const { data } = await axios.put(
            `/api/orders/${order._id}/pay`, paymentResult,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
        // disptach the data 
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message});
    }
};

//Order History Related action 
export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST});
    //get user info 
    const { userSignin: {userInfo}} = getState();
    
    // console.log('userInfo:', userInfo);
    
    try{
        // send ajax request to get the user's orders 
        const { data } = await axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};

// export const listOrderMine = () => async (dispatch, getState) => {
//     dispatch({ type: ORDER_MINE_LIST_REQUEST });
//     const {
//         userSignin: { userInfo },
//     } = getState();
//     try {
//         const { data } = await axios.get('/api/orders/mine', {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         });
//         dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
//     } catch (error) {
//         const message =
//       error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//         dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
//     }
// };