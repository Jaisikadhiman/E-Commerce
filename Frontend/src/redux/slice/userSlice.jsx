import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null, // Stores logged-in user details
    isAuthenticated: false,
    loginUser:null
  };
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      register: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        console.log("Updated State:", state);
      },
      clearUser: (state) => {
        state.user = null;
        state.isAuthenticated = false;
      },
      loginUser:(state ,action)=>{
        state.isAuthenticated = true;
        state.loginUser = action.payload;
      },
      logout:(state,action)=>{
        state.loginUser=null;
        state.isAuthenticated = false;
      }
    },
  });
  
  export const { register, clearUser ,loginUser ,logout } = userSlice.actions;
  
  export default userSlice.reducer;