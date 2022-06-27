import { UPDATE_ADDRESS } from "../actions/types";

const initialState = {
  shippingBilling: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return {
        ...state,
        shippingbilling: action.payload,
      }
    default:
      return state;
  }
}