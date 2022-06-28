import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  LOG_OUT_USER,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  USER_LOADING,
} from "./types";
import { useHistory } from "react-router-dom";

// register
export const registerUser = (userData, history) => async (dispatch) => {
  await axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/")) //redirect to login
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// google
export const googleUser = () => async (dispatch) => {
  console.log("google");
  await axios
    .get("/auth/google/success")
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      // set current user
      dispatch(setCurrentUser(decoded));
      console.log(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// github
export const githubUser = () => async (dispatch) => {
  console.log("github");
  await axios
    .get("/auth/github/success")
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("decoded: " + decoded);
      // set current user
      dispatch(setCurrentUser(decoded));
      console.log(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// login
export const loginUser = (userData) => async (dispatch) => {
  // const history = useHistory();
  await axios
    .post("/api/users/login", userData)
    .then(async (res) => {
      // save to localStorage
      // set token to localStorage
      const { token } = await res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(getCurrentUser(decoded));
      // history.push("/dashboard");
    })
    .catch((err) => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// get user
export const currentUser = () => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  await axios
    .get("/api/users/me", { headers: { Authorization: token } })
    .then(async (res) => {
      // get data
      const data = await res.data;

      if (token) {
        dispatch(getCurrentUser(data));
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getCurrentUser = (decoded) => {
  return {
    type: GET_CURRENT_USER,
    payload: decoded,
  };
};

// set user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// log out
export const logOutUser = () => (dispatch) => {
  // remove token
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  // set current user to empty {} -> isAuthenticated = false
  return {
    type: LOG_OUT_USER,
  };
};
