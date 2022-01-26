import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    userName: "",
    loggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
