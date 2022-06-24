import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT } from "../actions/types";

const initialState = {
  products: [],
  product: {},
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
    default:
      return state;
  }
}
