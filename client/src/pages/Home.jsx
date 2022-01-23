import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../routes";
import { useFetch } from "../use-fetch";

import { NavBar, Mock, Projects, Loader } from "../components";
import addNew from "./addNew.png";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
import { useEffect } from "react";
import { selectCurrProjects } from "../features/projectReducer";
import { updateCurUserDetails } from "../services";

export default function Home() {
  const user = useSelector(selectUser);
  let showContent = useLocation().pathname === "/";
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/register");
    updateCurUserDetails(user.userId, user.project);
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
        <Link to={ROUTES.JOIN} className="text-xs text-red-700 italic font-bold">
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
      <div className="flex flex-col text-gray-800 md:w-64 h-32 min-w-full p-4 bg-white-duller shadow-md rounded-md md:ml-2 hover:bg-opacity-10 hover:scale-[101%] transform-gpu transition-all hover:shadow-lg hover:w-72 duration-200 border border-white-light group overflow-hidden hover:border-gray-800 hover:border-opacity-20 border-opacity-5">
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
      <div className="flex flex-col flex-wrap gap-4 lg:flex-row">
        {project.length > 0 ? (
          currProjects.length > 0 ? (
            currProjects.map(Project)
          ) : (
            <Loader />
          )
        ) : (
          <span className="w-full text-center border-2 border-dotted rounded-md flex flex-col items-center justify-center py-8 text-gray-800 text-opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 11h4m-2-2v4"
              />
            </svg>
            <p className="font-medium text-xs">
              u dont have any project <strong>yet</strong>
              <br />
              Time to create one
            </p>
          </span>
        )}
      </div>
    </section>
  );
};
// createdAt: "2022-01-21T11:09:35.471Z"
// date: "2022-01-21T11:09:35.468Z"
// deadline: "2022-01-31"
// desc: "Description...
// head: "a mern project"
// mentor: "mentor@gmail.com"
// projectname: "project1"
// teamMembersMail: (3) [{…}, {…}, {…}]
// teamleaderid: "61ea92e17f8fe01b10578591"
// updatedAt: "2022-01-21T11:09:35.471Z"
// __v: 0
// _id: "61ea946f7f8fe01b105785a7"

// const Catagories = ({ type }) => {
//   const { State, loading, error } = useFetch(
//     `http://localhost:5000/${type.toLowerCase()}`
//   );
//   return (
//     <div className="overflow-x-hidden w-full">
//       <h1 className="text-2xl font-semibold text-gray-900 text-opacity-90 my-4">
//         {type}
//       </h1>
//       {loading ? (
//         <Mock limit={[0, 1, 2, 3]} />
//       ) : (
//         <Projects
//           data={{ feed: State, type }}
//           // refLink={ROUTES.Live_fet}
//           isLoading={true}
//         />
//       )}
//     </div>
//   );
// };
