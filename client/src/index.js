import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";

import { FirebaseProvider } from "./context/FirebaseContext";
import App from "./App";

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById("root")
);
