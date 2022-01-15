import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as ROUTES from "./routes";
import "./styles/globalStyles.css";

import { Register, Home, Login } from "./pages";
import { Error, CreatePro, Anime } from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route exact path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.DASH_B} element={<Home />}>
          <Route path="project/:name/:id" element={<Anime />}></Route>
          <Route path="create" element={<CreatePro />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}
