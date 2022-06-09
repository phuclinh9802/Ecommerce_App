import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from '../reducers/toggleSlice'

export default configureStore({
    reducer: {

        toggle: toggleReducer
    }
})