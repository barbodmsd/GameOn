import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "null",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logOut:(state)=>{
        state.token=null
    }
  },
});

export const {login,logOut} =authSlice.actions
export default authSlice.reducer