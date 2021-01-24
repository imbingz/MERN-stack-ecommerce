
import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action ) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            // product is product._id defined in cartActions.js
            const existItem = state.cartItems.find(x => x.product === item.product);
            // if the item added to cart already exists, replace existed with item 
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x )
                };
            } 
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            };
            
        default:
            return state;
    }
};