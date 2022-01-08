import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import "./styles/globalStyles.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Anime from "./components/Anime";
import CreatePro from "./components/CreatePro";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route path={ROUTES.DASH_B} element={<Home />}>
          <Route path="project/:name/:id" element={<Anime />}></Route>
          <Route path="create" element={<CreatePro />} />
        </Route>
      </Routes>
    </Router>
  );
}
