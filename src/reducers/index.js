import { combineReducers } from "redux";
import authReducers from "./authReducers";
import cartReducers from "./cartReducers";
import errorReducers from "./errorReducers";
import productReducers from "./productReducers";
import shippingReducers from "./shippingReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  products: productReducers,
  cart: cartReducers,
  shipping: shippingReducers,
});
