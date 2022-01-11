import { useContext, useEffect, useRef, useState, Fragment} from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'

import { FirebaseContext } from "../context/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
export default function NavBar({ handleSearch }) {
  const loc = useLocation();
  const { firebase } = useContext(FirebaseContext);
  const [user] = useAuthState(firebase.auth());

  const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (
    // <header className="h-14 flex items-center justify-between py-4 px-8 bg-white-light dark:bg-cgray-700 mb-3 text-cgray-heavy dark:text-white-light z-50">
    //   {user ? (
    //     <div className="text-lg opacity-90">
    //       Hello,{" "}
    //       <strong className="text-2xl font-semibold">{user.displayName}</strong>
    //     </div>
    //   ) : (
    //     <div className="text-2xl  font-bold">Edith</div>
    //   )}
    //   <div className="flex group space-x-2 items-center">
    //     <div>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="h-6 w-6"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    //         />
    //       </svg>
    //     </div>
    //     {user ? (
    //       <div className="relative w-6">
    //         <span className="absolute -top-1 -right-3 w-3 h-3 border-2 border-gray-800 mr-2 bg-blue-400 rounded-full"></span>
    //         <img
    //           src={user.photoURL}
    //           alt="userImg"
    //           aria-label="user profile picture"
    //           className="object-fill rounded-full overflow-hidden "
    //         />
    //       </div>
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    // </header>



    <Disclosure as="nav" className="bg-gray-800">
    {({ open }) => (
      <div>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center  dark:text-white-light ">
              {user ? (
                    <div className="text-lg opacity-90">
                      Hello,{" "}
                      <strong className="text-2xl font-semibold">{user.displayName}</strong>
                    </div>
                  ) : (
                    <div className="text-2xl  font-bold">Edith</div>
                  )}
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-400 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.photoURL}    
                       alt=""
                    />
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
                  <Menu.Items className=" bg-gray-200 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                         href="/logout"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              ):(
                <Link to="/register">login</Link>
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
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
        </div>
    )}
  </Disclosure>
  );
}
