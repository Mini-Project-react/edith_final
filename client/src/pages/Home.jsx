import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../routes";
import { useFetch } from "../use-fetch";

import { NavBar, Mock, Projects } from "../components";
import Login from "./Login";
import addNew from "./addNew.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
import { useEffect } from "react";
import {
  InitialLizeStore,
  selectCurrProjects,
} from "../features/projectReducer";
import { getCurrUser, getProjectsApi } from "../helper";
import axios from "axios";
import { updateCurUserDetails, updateCurUserProjects } from "../services";

export default function Home() {
  const user = useSelector(selectUser);
  let showContent = useLocation().pathname === "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    !user && navigate("/register");
    // fetchDataFromApi(getCurrUser(user.userId)).then(([data, err]) => {
    //   dispatch(Login(data.response));
    // });

    updateCurUserDetails(user.userId, user.project);
    axios
      .get(getProjectsApi())
      .then((res) => {
        if (!res.errors) {
          dispatch(
            InitialLizeStore(
              res.data.response.filter((x) => user.project.includes(x._id))
            )
          );
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
      {showContent && user && (
        <div>
          <HomeTop />
          {/* <Catagories type="projects" />
          <Catagories type="Live" />
        <Catagories type="upcomming" /> */}
          {user.project !== undefined && (
            <UserProjects userId={user.userId} project={user.project} />
          )}
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
            navigateTo(ROUTES.CREATEPROJECT);
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
const UserProjects = ({ project, userId }) => {
  const currProjects = useSelector(selectCurrProjects);

  const Project = (pro) => (
    <Link to={`/projectdetails/${pro._id}`}>
      <div className="flex flex-col text-gray-800 md:w-64 h-32 min-w-full p-4 bg-white-duller shadow-md rounded-md md:ml-2 hover:bg-opacity-10 hover:scale-[101%] transform-gpu transition-all hover:shadow-lg hover:w-72 duration-200 border border-white-light border-opacity-30 group overflow-hidden">
        <div className="flex justify-between whitespace-nowrap">
          <h1 className="font-bold text-xl underline underline-offset-1 mb-2 ">
            {pro.projectname}
          </h1>
          <div className="flex items-center space-x-1 justify-around translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 transform-gpu duration-300 opacity-0 flex-nowrap">
            <span className="rounded-full h-2 w-2 bg-green-best bg-opacity-30"></span>
            <p className="whitespace-nowrap">2 works pending</p>
          </div>
        </div>
        <div className="">
          <p className="font-medium text-sm">{pro.head}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="text-cgray-heavy w-full">
      <h1 className="font-semibold text-xl mb-6">Your Projects</h1>
      <div className="flex flex-col flex-wrap gap-4 md:flex-row">
        {project.length > 0 ? (
          currProjects.length > 0 ? (
            <>{currProjects.map(Project)}</>
          ) : (
            <Loader />
          )
        ) : (
          <>u dont have any project </>
        )}
      </div>
    </section>
  );
};
// createdAt: "2022-01-21T11:09:35.471Z"
// date: "2022-01-21T11:09:35.468Z"
// deadline: "2022-01-31"
// desc: "Description is the fiction-writing mode for transmitting a mental image of the particulars of a story. Together with dialogue, narration, exposition, and summarization, description is one of the most widely recognized of the fiction-writing modes. As stated in Writing from A to Z, edited by Kirk Polking, description is more than the amassing of details; it is bringing something to life by carefully choosing and arranging words and phrases to produce the desired effect.[6] The most appropriate and effective techniques for presenting description are a matter of ongoing discussion among writers and writing coaches."
// head: "a mern project"
// mentor: "mentor@gmail.com"
// projectname: "project1"
// teamMembersMail: (3) [{…}, {…}, {…}]
// teamleaderid: "61ea92e17f8fe01b10578591"
// updatedAt: "2022-01-21T11:09:35.471Z"
// __v: 0
// _id: "61ea946f7f8fe01b105785a7"
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

const Loader = () => (
  <div className="h-screen w-screen absolute top-0 left-0 bg-black -z-10 bg-opacity-30 text-center text-black flex items-center justify-center">
    <span
      className="border-4 border-l-cgray-900 shadow-sm border-opacity-30
 border-white-dull rounded-full p-4 animate-spin"
    ></span>
  </div>
);
