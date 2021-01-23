import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants';

//productListReducer takes the payload from productAxtions --> dispatch
// if no default state, we will see an error 
export const productListReducer = (state = {loading: true, products: []}, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true};
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL: 
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

