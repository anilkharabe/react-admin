import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name:"auth",
   initialState : {
        token: sessionStorage.getItem('token') || null,
        user: null
    },
    reducers:{
        setCredentials: (state, action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;

            sessionStorage.setItem('token', action.payload.token)
        },
        logout:(state)=>{
            state.token = null;
            state.user = null;
            sessionStorage.removeItem('token')
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;