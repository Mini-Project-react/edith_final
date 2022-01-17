import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProjects: JSON.parse(localStorage.getItem("projects")) || [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    AddTocurrentProjects: (state, { payload }) => {
      state.currentProjects = [payload, ...state.currentProjects];
      localStorage.setItem("projects", JSON.stringify(state.currentProjects));
    },
  },
});

export const { AddTocurrentProjects } = projectSlice.actions;
export const selectCurrProjects = (state) => state.projects.currentProjects;
export default projectSlice.reducer;
