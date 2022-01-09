import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";

import { FirebaseProvider } from "./context/FirebaseContext";
import App from "./App";

ReactDOM.render(
  <FirebaseProvider>
  <div className="bg" />
  <div className="bg bg2" />
  <div className="bg bg3" />  
  <App />
  </FirebaseProvider>,
  document.getElementById("root")
);
