import React from "react";
import { useState } from "react";

function Mentor() {
  const [showModal, setShowModal] = React.useState(false);
  const [form, showform] = useState(false);
  return (
    <div>
      <div className="container mx-auto max-w-[80%] flex flex-col space-y-4 justify-center items-center">
        {form ? (
          <form className="w-full max-w-2xl p-5 shadow-2xl flex flex-col items-center ">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Task Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="ADD CSS"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Task description
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"></textarea>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Dead Line
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="date"
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className=" flex m-2 p-2">
                <div>
                  <button
                    className="shadow m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Assign Task
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => showform(false)}
                    className="shadow m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-white-light flex items-center shadow-xl md:w-full p-4 m-3">
            <button
              onClick={() => showform(true)}
              className="p-3 items-center  md:w-[100%]  h-20 rounded-md bg-violet-600 text-white-light"
            >
              Assign new Task
            </button>
          </div>
        )}
        <div className="bg-white w-full flex items-center p-2 rounded-xl shadow border">
          <div className="flex items-center space-x-4">
            <img
              src="https://avatars2.githubusercontent.com/u/1490347?s=460&u=39d7a6b9bc030244e2c509119e5f64eabb2b1727&v=4"
              alt="My profile"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className="flex-grow p-3">
            <div className="font-semibold text-gray-700">Task Name</div>
            <div className="font-semibold text-gray-500">
              Decription blablabala
            </div>
            <div className="text-sm text-gray-500">28 jan 2022</div>
          </div>
          <div className="p-2">
            <span className="block h-4 w-4  bottom-3  right-9 relative">
              <button
                className="p-2 items-center  rounded-md bg-violet-600 text-white-light "
                onClick={() => setShowModal(true)}
              >
                view
              </button>
            </span>
          </div>
        </div>
        <div className="bg-white w-full flex items-center p-2 rounded-xl shadow border">
          <div className="flex items-center space-x-4">
            <img
              src="https://avatars2.githubusercontent.com/u/1490347?s=460&u=39d7a6b9bc030244e2c509119e5f64eabb2b1727&v=4"
              alt="My profile"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className="flex-grow p-3">
            <div className="font-semibold text-gray-700">Task Name</div>
            <div className="font-semibold text-gray-500">
              Decription blablabala
            </div>
            <div className="text-sm text-gray-500">28 jan 2022</div>
          </div>
        </div>
      </div>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full   bg-white-light outline-none focus:outline-none">
                {/*header*/}

                <div className="sm:max-w-lg w-full  pt-5 px-12 bg-white rounded-xl z-10">
                  <button
                    className="p-2 ml-auto  bg-red-500 border-0  rounded-full  text-white-duller float-right text-lg leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                  <div className="text-center">
                    <h2 className=" text-3xl font-bold text-gray-900">
                      Task Name
                    </h2>
                  </div>
                  <form className="mt-8 space-y-3" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Team leader--teamleader@gmail.com
                      </label>
                      <div className="flex  justify-between">
                        <label className="text-lg font-bold text-gray-800 tracking-wide">
                          filename.pdf{" "}
                        </label>

                        <input
                          type="checkbox"
                          className=" m-2 right-0 h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                        ></input>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Member--teammate1@gmail.com
                      </label>
                      <div className="flex  justify-between">
                        <label className="text-lg font-bold text-gray-800 tracking-wide">
                          filename.pdf{" "}
                        </label>

                        <input
                          type="checkbox"
                          className=" m-2 right-0 h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                        ></input>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Member--teammate2@gmail.com
                      </label>
                      <div className="flex  justify-between">
                        <label className="text-lg font-bold text-gray-800 tracking-wide">
                          filename.pdf{" "}
                        </label>

                        <input
                          type="checkbox"
                          className=" m-2 right-0 h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                        ></input>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Member--teammate3@gmail.com
                      </label>
                      <div className="flex  justify-between">
                        <label className="text-lg font-bold text-gray-800 tracking-wide">
                          filename.pdf{" "}
                        </label>

                        <input
                          type="checkbox"
                          className=" m-2 right-0 h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                        ></input>
                      </div>
                    </div>

                    <div>
                      <button
                        className="  text-green-best left-0 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        mark Attendence
                      </button>
                      <button
                        className="text-red-500 right-0 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}

export default Mentor;
