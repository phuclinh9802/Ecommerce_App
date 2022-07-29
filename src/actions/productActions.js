import axios from "axios";

import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT } from "./types";

const token = localStorage.getItem("jwtToken");
export const getProducts = () => (dispatch) => {
  axios.get("/api/product", { Authorization: token }).then((res) => {
    const data = res.data;
    dispatch(getListProducts(data));
  });
};

export const currentProduct = (index) => async (dispatch) => {
  await axios.get(`/api/product/${index}`).then((res) => {
    const data = res.data;
    dispatch(getProduct(data));
  });
};

export const createProduct = (productData) => (dispatch) => {
  axios.post("/api/product", productData, { headers: { Authorization: token } }).then((res) => {
    dispatch(setProduct(productData))
  })
}



export const getListProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const getProduct = (data) => {
  return {
    type: GET_PRODUCT,
    payload: data,
  };
};

export const setProduct = (data) => {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  }
}
