import { StarRateTwoTone } from "@material-ui/icons";
import { DELETE_CART, POST_CART, UPDATE_QUANTITY_PRODUCT } from "../actions/types";

const initialState = {
  items: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_CART:
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case UPDATE_QUANTITY_PRODUCT:
      return {
        ...state,
        items: state.items.map((item, i) => item.id === action.payload.id
          ? {
            ...item,
            price: action.payload.price,
            quantity: action.payload.quantity
          }
          : item
        ),
      }
    case DELETE_CART:
      return {
        ...state,
        items: state.items.filter(item =>
          item.uniqueId !== action.payload
        )
      }
    default:
      return state;
  }
}