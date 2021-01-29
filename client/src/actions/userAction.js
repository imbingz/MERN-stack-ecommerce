import axios from 'axios';
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';

// signin action 
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password}});

    try{
        // use axios for http post request when user signing in 
        const { data } = await axios.post('/api/users/signin', { email, password});
        // if success, dispatch success and set payload to data 
        dispatch({ type: USER_SIGNIN_SUCCESS, payload:  data });
        // save data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));

    }catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};

// signout action 

export const signout = () => (dispatch) => {
    //remove userInfo and cartItems from localStorage upon user signout 
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_SIGNOUT});
};