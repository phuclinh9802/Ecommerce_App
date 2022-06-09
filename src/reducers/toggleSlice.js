import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        value: false // not signed in yet
    },
    reducers: {
        toggling: (state, action) => {
            state.value = !action.payload
        }
    }
})

export const { toggling } = toggleSlice.actions

export default toggleSlice.reducer