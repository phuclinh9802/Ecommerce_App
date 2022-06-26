import { StarRateTwoTone } from "@material-ui/icons";
import { POST_CART } from "../actions/types";

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
    default:
      return state;
  }
}