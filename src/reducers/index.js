import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import productReducers from "./productReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productReducers,
});
