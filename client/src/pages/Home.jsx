import { Link, Outlet, useNavigate } from "react-router-dom";
import * as ROUTES from "../routes";
import { useFetch } from "../use-fetch";
import { useLocation } from "react-router-dom";

import NavBar from "../components/Navbar";
import Mock from "../components/Mock";
import Projects from "../components/Projects";

import addNew from "./addNew.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
import { useEffect } from "react";
import {
  InitialLizeStore,
  selectCurrProjects,
} from "../features/projectReducer";
import { getProjectsApi } from "../helper";
import { fetchDataFromApi } from "../fetchData";
import axios from "axios";

export default function Home() {
  let showContent = useLocation().pathname === "/";
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    !user && navigate("/register");
    axios
      .get(getProjectsApi())
      .then((res) => {
        if (!res.errors) {
          console.log(res.data);
          dispatch(InitialLizeStore(res.data.response));
          // hav to check for the his project id
          // with the reference from the user-> project details
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Profile />
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
      <main className="mx-auto text-center flex items-center justify-center max-h-40 group hover:scale-105 transform-gpu transition-transform duration-150 shadow rounded md:h-32 h-20 overflow-hidden relative  w-10/12 md:w-8/12 hover:cursor-pointer">
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
            className="object-cover -mt-16 opacity-75 group-hover:opacity-60 transform-gpu transition-opacity duration-150 -z-10 h-full"
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
const Profile = () => {
  const currProjects = useSelector(selectCurrProjects);
  console.log(currProjects);
  const Project = ({ head }) => (
    <div className="flex flex-col text-gray-800 md:max-w-xs sm:w-full p-4 bg-white-duller shadow-md rounded-md md:ml-2 hover:bg-opacity-10 transform-gpu transition-all hover:shadow-lg duration-150 border border-white-light border-opacity-30">
      <h1 className="font-bold text-xl underline underline-offset-1">{head}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
        soluta aut quia molestias molestiae odio repudiandae rerum animi,
        asperiores accusamus facere quaerat explicabo corporis sapiente incidunt
        quae reprehenderit fugit ipsum. Quos earum placeat incidunt quas dolorem
        teneturs illum, vitae, accusamus hic doloribus nisi placeat.
      </p>
    </div>
  );
  return (
    <div className="flex md:space-x-2 flex-wrap gap-4">
      {currProjects.length > 0 ? (
        <>
          {currProjects.map((pro) => (
            <Link to={`projects/${pro._id}`} key={pro._id}>
              <Project head={pro.projectname} key={pro._id} />
            </Link>
          ))}
        </>
      ) : (
        <>nothig to show</>
      )}
    </div>
  );
};
// projectname:"sadf"
// teamleaderid:"61e59211ab7cc14654d6223d"
// head:"iubu"
// desc:"dfvdfs"
// deadline:"2022-01-13"
// _id:"61e59c523d1a62f3cd724445"
// date:"2022-01-17T16:41:54.755Z"
// createdAt:"2022-01-17T16:41:54.757Z"
// updatedAt:"2022-01-17T16:41:54.757Z"

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
