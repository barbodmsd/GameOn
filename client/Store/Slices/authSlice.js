import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "null",
  user:'null'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut:(state)=>{
        state.token=null
        state.user=null
    }
  },
});

export const {login,logOut} =authSlice.actions
export default authSlice.reducer