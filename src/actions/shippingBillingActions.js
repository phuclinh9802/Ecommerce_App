import axios from 'axios';
import { UPDATE_ADDRESS } from './types';


const token = localStorage.getItem("jwtToken");

export const updateAddress = (data) => async (dispatch) => {
  await axios.put('https://ecommerce-backend-cheapi.herokuapp.com/api/users/shipping-billing', data, { headers: { Authorization: token } }).then(async (res) => {
    await dispatch(updateShippingBillingAddress(data))
  })
}

export const updateShippingBillingAddress = (data) => {
  return {
    type: UPDATE_ADDRESS,
    payload: data,
  }
}
