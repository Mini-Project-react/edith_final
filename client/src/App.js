import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as ROUTES from "./routes";
import "./styles/globalStyles.css";

import { Register, Home, Login, Profile } from "./pages";
import { Error, CreatePro, Anime } from "./components";
import ProjectDetails from "./components/ProjectDetails";
// import CreateProject from "./components/CreateProject";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route exact path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.DASH_B} element={<Home />}>
          <Route path="project/:name/:id" element={<Anime />}></Route>
          <Route path="projectdetails/:id" element={<ProjectDetails />}></Route>
          <Route path={ROUTES.CREATEPROJECT} element={<CreatePro />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}
