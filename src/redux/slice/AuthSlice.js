import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userInfo: null,
  error: null,
  isToken: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    // LOGIN ACTIONS
    userLoginStart: (state, action) => {
      state.isLoading = true;
    },
    userLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.isToken = true;
      localStorage.setItem("token", action.payload);
    },
    userLoginFailure: (state, action) => {
      state.isLoading = false;
      state.error = "Cannot login";
    },
    // GET USER INFO ACTIONS
    getUserInfoStart: (state, action) => {
      state.isLoading = true;
    },
    getUserInfoSuccess: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    getUserInfoFailure: (state, action) => {
      state.isLoading = false;
      state.error = "Cannot get user info";
    },
    // REGISTER ACTIONS
    registerUserStart: (state, action) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isToken = true;
      localStorage.setItem("token", action.payload);
    },
    registerUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = "Cannot register.";
    },
    // LOG OUT
    clearUserInfo: (state) => {
      state.isToken = false;
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
});
export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  clearUserInfo,
} = AuthSlice.actions;
export default AuthSlice.reducer;
