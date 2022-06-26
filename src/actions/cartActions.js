import { POST_CART } from "./types";


export const postCart = (data) => dispatch => {
  dispatch({
    type: POST_CART,
    payload: data,
  })
}