import { logout } from "../features/userReducer";
import { useLocation } from "react-router";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../routes";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";

export default function NavBar({ user }) {
  user && console.log("user is here ", user);
  const loc = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = [
    {
      name: "Home",
      href: ROUTES.DASH_B,
      current: loc.pathname === ROUTES.DASH_B,
    },
    {
      name: "Team",
      href: ROUTES.TEAM,
      current: loc.pathname === ROUTES.TEAM,
    },
    {
      name: "Projects",
      href: ROUTES.PROJECT,
      current: loc.pathname === ROUTES.PROJECT,
    },
    {
      name: "Calendar",
      href: ROUTES.CALENDER,
      current: loc.pathname === ROUTES.CALENDER,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleSignOut = () => {
    dispatch(logout());
    navigate("/register");
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="w-11/12 mx-auto">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="dark:text-white-light ">
                  {user ? (
                    <p className="text-lg opacity-90">
                      Hello,{" "}
                      <strong className="text-2xl font-semibold">
                        {user.displayName}
                      </strong>
                    </p>
                  ) : (
                    <div className="text-2xl  font-bold">Edith</div>
                  )}
                </div>
                {user && (
                  <div className="hidden md:block ml-4">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-600 text-white-light  "
                              : "text-gray-300 hover:bg-gray-700 ",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* nav left */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* notification icon */}
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
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
                </button>

                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img
                            className="object-cover h-full"
                            // replace the user img
                            src={
                              "https://w.wallhaven.cc/full/13/wallhaven-135vl3.png"
                            }
                            alt=""
                          />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className=" bg-gray-200 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              href="#"
                              //  onClick={}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                              onClick={handleSignOut}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    to="/login"
                    className="border-b-2 border-r-2 ml-2 border-violet-900 border-opacity-50 text-gray-300 hover:bg-gray-700 hover:text-white-light  px-3 py-2 rounded-md text-sm font-medium hover:-translate-y-[1px] hover:-translate-x-[1px] transform-gpu transition-all duration-200"
                  >
                    log-in
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
