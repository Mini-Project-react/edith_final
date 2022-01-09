import { Link, Outlet } from "react-router-dom";
import Projects from "../components/Projects";
import { useFetch } from "../hooks/use-fetch";
import Mock from "../components/Mock";
import NavBar from "../components/Navbar";
// import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
export default function Home() {
  const lcoation = useLocation();
  let showContent = lcoation.pathname === "/";
  return (
    <HomePage>
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
    <div className="md:max-w-screen-2xlw container w-5/6 mx-auto">
      {props.children}
    </div>
  </main>
);
const HomeTop = () => {
  return (
    <div className="w-full flex flex-col mb-4">
      <Link to={"/create"}>
        <div className="w-full rounded-md  border-2 border-black border-opacity-40 h-16 p-4 text-center text-cgray-heavy text-opacity-80 text-lg  hover:bg-cgray-700  hover:text-white-light font-medium overflow-hidden transform transition duration-200 hover:scale-105 antialiased">
          Add new
        </div>
      </Link>
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
