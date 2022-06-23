import {
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  USER_LOADING,
  LOG_OUT_USER,
} from "../actions/types";
const isEmpty = require("is-empty");

const token = localStorage.getItem("jwtToken");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  me: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("in reducers " + JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(token),
        me: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: isEmpty(action.payload),
        user: {},
      };
    default:
      return state;
  }
}
