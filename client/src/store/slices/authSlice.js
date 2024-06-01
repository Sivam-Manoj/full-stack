import { createSlice } from "@reduxjs/toolkit";

// Function to retrieve user data from sessionStorage
const getUserDataFromSessionStorage = () => {
  const data = sessionStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

const initialState = {
  userData: getUserDataFromSessionStorage(),
  isLoggedIn: !!getUserDataFromSessionStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
