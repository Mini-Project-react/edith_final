import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProjects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    AddTocurrentProjects: (state, { payload }) => {
      state.currentProjects = [payload, ...state.currentProjects];
    },
    InitialLizeStore: (state, { payload }) => {
      state.currentProjects = payload;
    },
  },
});

export const { AddTocurrentProjects, InitialLizeStore } = projectSlice.actions;
export const selectCurrProjects = (state) => state.projects.currentProjects;
export default projectSlice.reducer;
