import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";

const Profile = () => {
  const user = useSelector(selectUser);
  return (
    <section className="flex flex-col">
      {/* <div>
        <p>shortcuts</p>
        <div className="text-white-light">
          <div className="px-4 py-3 bg-gray-700 rounded-md w-fit border border-white-light shadow-md">
            contacts
          </div>
        </div>
      </div> */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        <div>
          <h2 className="font-semibold">Email</h2>
          <p className="text-cgray-600">{user.email}</p>
        </div>
      </div>
    </section>
  );
};
export default Profile;
