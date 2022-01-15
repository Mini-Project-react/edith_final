import { Link, Outlet, useNavigate } from "react-router-dom";
import * as ROUTES from "../routes";
import { useFetch } from "../use-fetch";
import { useLocation } from "react-router-dom";

import NavBar from "../components/Navbar";
import Mock from "../components/Mock";
import Projects from "../components/Projects";

import addNew from "./addNew.png";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
import { useEffect } from "react";

export default function Home() {
  let showContent = useLocation().pathname === "/";
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/register");
  }, []);
  const HomePage = (props) => (
    <main className="h-screen dark">
      <NavBar user={user} />
      <div className="md:max-w-screen-2xl container w-5/6 mx-auto">
        {props.children}
      </div>
    </main>
  );
  return (
    <HomePage>
      <br />
      <br />
      {showContent && (
        <div>
          <HomeTop />
          {/* <Catagories type="projects" />
          <Catagories type="Live" />
          <Catagories type="upcomming" /> */}
        </div>
      )}
      <Outlet />
    </HomePage>
  );
}

const HomeTop = () => {
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col mb-4 w-full">
      <main className="mx-auto text-center flex items-center justify-center max-h-40 group hover:scale-105 transform-gpu transition-all duration-150 shadow rounded h-32 overflow-hidden relative  w-6/12 md:w-8/12 hover:cursor-pointer">
        <div
          className=" border-none overflow-hidden bg-black absolute"
          onClick={() => {
            navigateTo(ROUTES.CREATE);
            console.log("asdf");
          }}
        >
          {/* <img src={addNew} alt="..." className="shadow rounded max-w-full h-auto align-middle border-none" /> */}
          {/* change the image i added just for the scale ++ -mt-16 for going bottom without margin it show the top part*/}
          <img
            src={addNew}
            alt="..."
            className="object-cover -mt-16 opacity-75 group-hover:opacity-60 transform-gpu transition-all duration-150 -z-10"
          />
        </div>
        <span className="z-10 text-white-light group-hover:text-sm text-xl transform transition-all duration-150">
          new project
        </span>
      </main>
      <div className="flex flex-nowrap  py-2 w-full  items-center">
        <p className="ml-auto px-1 text-xs text-opacity-30 italic">
          create <strong className="text-sm ">{"{your}"}</strong> own procject,
          or maybe{" "}
        </p>
        <Link to={"/create"} className="text-xs text-red-700 italic font-bold">
          join
        </Link>
      </div>
    </div>
  );
};
const Catagories = ({ type }) => {
  const { State, loading, error } = useFetch(
    `http://localhost:5000/${type.toLowerCase()}`
  );
  return (
    <div className="overflow-x-hidden w-full">
      <h1 className="text-2xl font-semibold text-gray-900 text-opacity-90 my-4">
        {type}
      </h1>
      {loading ? (
        <Mock limit={[0, 1, 2, 3]} />
      ) : (
        <Projects
          data={{ feed: State, type }}
          // refLink={ROUTES.Live_fet}
          isLoading={true}
        />
      )}
    </div>
  );
};
