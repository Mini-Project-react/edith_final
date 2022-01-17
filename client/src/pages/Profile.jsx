import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrProjects } from "../features/projectReducer";

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
            <Link to={`/projects/${pro._id}`}>
              <Project head={pro.projectname} key={pro._id} />
            </Link>
          ))}
        </>
      ) : (
        <>
        nothig to show
        </>
      )}
    </div>
  );
};
export default Profile;
// projectname:"sadf"
// teamleaderid:"61e59211ab7cc14654d6223d"
// head:"iubu"
// desc:"dfvdfs"
// deadline:"2022-01-13"
// _id:"61e59c523d1a62f3cd724445"
// date:"2022-01-17T16:41:54.755Z"
// createdAt:"2022-01-17T16:41:54.757Z"
// updatedAt:"2022-01-17T16:41:54.757Z"
