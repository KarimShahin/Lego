import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import wishlistReducer from'./wishListReducer';

export default combineReducers({
    cart:cartReducer,
    wishlist:wishlistReducer
});
