import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      state.value = payload;
    },
    login: (state, { payload }) => {
      state.value = { ...state.value, payload };
    },
    logout: (state) => {
      state.value = null;
      localStorage.removeItem("user");
    },
  },
});

export const { register, logout } = userSlice.actions;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
