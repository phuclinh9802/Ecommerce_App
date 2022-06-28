import { DELETE_CART, POST_CART } from "./types";


export const postCart = (data) => dispatch => {
  dispatch({
    type: POST_CART,
    payload: data,
  })
}

export const deleteCart = (id) => dispatch => {
  dispatch({
    type: DELETE_CART,
    payload: id,
  })
}