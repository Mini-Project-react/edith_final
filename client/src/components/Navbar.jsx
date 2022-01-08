import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
export default function NavBar({ handleSearch }) {
  const loc = useLocation();
  const { firebase } = useContext(FirebaseContext);
  const [user] = useAuthState(firebase.auth());

  return (
    <header className="h-14 flex items-center justify-between py-4 px-8 bg-white-light dark:bg-cgray-700 mb-3 text-cgray-heavy dark:text-white-light z-50">
      {user ? (
        <div className="text-lg opacity-90">
          Hello,{" "}
          <strong className="text-2xl font-semibold">{user.displayName}</strong>
        </div>
      ) : (
        <div className="text-2xl  font-bold">Edith</div>
      )}
      <div className="flex group space-x-2 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        {user ? (
          <div className="relative w-6">
            <span className="absolute -top-1 -right-3 w-3 h-3 border-2 border-gray-800 mr-2 bg-blue-400 rounded-full"></span>
            <img
              src={user.photoURL}
              alt="userImg"
              aria-label="user profile picture"
              className="object-fill rounded-full overflow-hidden "
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
}
