import axios from "axios";

import { GET_PRODUCTS, GET_PRODUCT } from "./types";

const token = localStorage.getItem("jwtToken");
export const getProducts = () => (dispatch) => {
  axios.get("/api/product", { Authorization: token }).then((res) => {
    const data = res.data;
    console.log("products: " + JSON.stringify(data));
    dispatch(getListProducts(data));
  });
};

export const currentProduct = (index) => (dispatch) => {
  console.log("index " + index);
  axios.get(`/api/product/${index}`).then((res) => {
    const data = res.data;
    console.log("get a product " + data);
    dispatch(getProduct(data));
  });
};

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
