import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEMS:
            const item = action.payload;
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        default:
            return state;
    }
};
