import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import data from '../data/products';


const initialState = {};

const reducer = (state, action) => {
    return { products: data.products };
};

//https://extension.remotedev.io/#usage
//https://redux.js.org/api/compose
//connect to chrome redux developer extension (download the extension first in Chrome)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;