import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("project")) || null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
   project: (state, { payload }) => {
      localStorage.setItem("project", JSON.stringify(payload));
      state.value = payload;
    },
   
  },
});

export const { project } = projectSlice.actions;
//export const selectUser = (state) => state.user.value;
export default projectSlice.reducer;
