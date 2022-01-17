import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
export default configureStore({
  reducer: { user: userReducer,projects:projectReducer },
});
