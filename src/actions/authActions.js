import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
    GET_ERRORS, LOG_OUT_USER, SET_CURRENT_USER, USER_LOADING
} from './types'

// register
export const registerUser = (userData, history) => dispatch => {
    console.log("registerUser " + JSON.stringify(userData))
    axios.post("/api/users/register", userData)
        .then(res => history.push("/login")) //redirect to login
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// login 
export const loginUser = userData => dispatch => {
    console.log("loginUser " + userData.email)
    axios.post("/api/users/login", userData)
        .then(res => {
            // save to localStorage
            // set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // set token to auth header
            setAuthToken(token)
            // Decode token to get user data
            const decoded = jwt_decode(token)
            // set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            console.log(err.response.data);
            return dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

}

// set user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

// log out
export const logOutUser = () => dispatch => {
    // remove token
    localStorage.removeItem('jwtToken')
    // remove auth header for future requests
    setAuthToken(false)
    // set current user to empty {} -> isAuthenticated = false
    dispatch(setCurrentUser({}))
    return {
        type: LOG_OUT_USER
    }
}