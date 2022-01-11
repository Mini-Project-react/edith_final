import { Link } from "react-router-dom";

const Project = ({ details }) => {
  if (!details) 
  return (
    <Link
      className="mr-4 my-2 md:w-72 min-w-fit w-full md:hover:-translate-y-2 transform transition ease-in-out duration-150 flex"
      to={`/project/${details.head.toLowerCase().replace(/\s/g, "")}/${
        details.id
      }`}
    >
      {/* <div className="rounded-md overflow-hidden shadow-md mr-2 bg-gray-800">
        <img
          className="object-contain opacity-80"
          src={details.posterImage.tiny}
          alt=""
        />
      </div> */}
      <div className="hover:bg-gray-300 flex flex-col flex-auto rounded-md bg-cgray-700  text-white-light text-opacity-75 border-2 border-cgray-900 border-opacity-10   p-4 hover:text-black md:max-w-lg  DropShadow w-40">
        <div className="flex">
          <div className="font-medium text-lg text-white-light w-10/12 overflow-ellipsis truncate">
            <span className="bg-green-best rounded-sm px-2 py-1 shadow-md">
              {" "}
              {details.head || "no name"}
            </span>
          </div>
          {/* <span className="rounded-sm hover:shadow-2xl px-2 py-1  ml-auto text-white font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </span> */}
        </div>
        <div className="flex flex-nowrap py-2 w-full items-center md:justify-between">
          <div className="mr-3 w-1/2 flex flex-col flex-nowrap md:w-auto">
            <div className="mr-3 w-1/2 flex-nowrap">
              <p className=" font-normal text-opacity-80  mb-2">deadLine</p>
              <span className="font-bold ">
                {/* {details.episode != null
                  ? details.episode > 9
                    ? details.episode
                    : `0${details.episode}`
                  : "ongoing"} */}
                {details.EndsIn}
              </span>
            </div>
          </div>
          <div className="mr-3 w-1/2 flex-nowrap">
            <p className=" font-normal text-opacity-80  mb-2">mem count</p>
            <span className="font-bold ">
              {details.Memcount}
              {/* {details.status > 9 ? details.seaFin : `0${details.seaFin}`} */}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Project;
