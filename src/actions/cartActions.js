import { DELETE_CART, POST_CART, UPDATE_QUANTITY_PRODUCT } from "./types";


export const postCart = (data) => dispatch => {
  dispatch({
    type: POST_CART,
    payload: data,
  })
}

export const updateQtyProduct = (id, qty, price) => dispatch => {
  return dispatch({
    type: UPDATE_QUANTITY_PRODUCT,
    payload: { id, qty, price },
  })
}

export const deleteCart = (id) => dispatch => {
  dispatch({
    type: DELETE_CART,
    payload: id,
  })
}