import axios from 'axios';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';


//register action 
export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password}});

    try{
        // use axios for http post request when user REGISTERg in 
        const { data } = await axios.post('/api/users/register', { name, email, password});
        // if success, dispatch success and set payload to data 
        dispatch({ type: USER_REGISTER_SUCCESS, payload:  data });
        //also dispatch SignIn_Success because userSignin.userInfo is what we use to valid user
        dispatch({ type: USER_SIGNIN_SUCCESS, payload:  data });
        // save data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));

    }catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};



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