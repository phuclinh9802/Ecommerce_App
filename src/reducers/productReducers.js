import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_QUANTITY_PRODUCT } from "../actions/types";

const initialState = {
  products: [],
  product: {},
  qty: 1,
  price: 0.0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case UPDATE_QUANTITY_PRODUCT:
      return {
        ...state,
        qty: action.payload.qty,
        price: Number(action.payload.price) * Number(action.payload.qty),
      }
    default:
      return state;
  }
}
