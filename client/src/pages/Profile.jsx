import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Mock from "../../components/Mock";
import Projects from "../../components/Projects";

const Profile = () => {
  const { watchList } = useContext(GlobalContext);
  console.log(watchList);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 text-opacity-90 my-4">
        Watch List{" "}
      </h1>
      <Projects data={{ feed: watchList, type: "live" }} isLoading={false} />
    </div>
  );
};

export default Profile;
