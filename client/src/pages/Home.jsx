import { Link, Outlet, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useFetch } from "../hooks/use-fetch";
import { useLocation } from "react-router-dom";

import NavBar from "../components/Navbar";
import Mock from "../components/Mock";
import Projects from "../components/Projects";

import addNew from "./addNew.png";
// import addNew from "./add new.png";
import { FaPlus } from "react-icons/fa";
// import { GlobalContext } from "../context/GlobalContext";

export default function Home() {
  const lcoation = useLocation();
  let showContent = lcoation.pathname === "/";
  return (
    <HomePage>
      <br />
      <br />
      {showContent && (
        <div>
          <HomeTop />
          <Catagories type="projects" />
          <Catagories type="Live" />
          <Catagories type="upcomming" />
        </div>
      )}
      <Outlet />
    </HomePage>
  );
}
const HomePage = (props) => (
  <main className="h-screen dark">
    <NavBar />
    <div className="md:max-w-screen-2xl container w-5/6 mx-auto">
      {props.children}
    </div>
  </main>
);
const HomeTop = () => {
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col mb-4 w-full">
      <main className="mx-auto text-center flex items-center justify-center max-h-40 group hover:scale-105 transform-gpu transition-all duration-150 shadow rounded h-32 overflow-hidden relative  w-6/12 md:w-8/12 hover:cursor-pointer">
        {/* top [plus] */}
        {/* <span className="z-10 text-white-light absolute -top-2 -left-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span> */}
        {/* image holder div */}

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
