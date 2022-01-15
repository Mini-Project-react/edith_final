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
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { register } = userSlice.actions;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
