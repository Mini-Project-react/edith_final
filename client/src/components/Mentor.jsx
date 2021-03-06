import React from "react";
import { useFetch } from "../use-fetch";
import { useState } from "react";
import { postAttendenceApi, postTaskApi } from "../helper";
import { getTaskApi } from "../helper";
import axios from "axios";
import { Disclosure, Menu, Transition } from "@headlessui/react";

function Mentor(props) {
  const [showModal, setShowModal] = React.useState("");
  const [form, showform] = useState(false);
  const [State, loading, , rerender] = useFetch(getTaskApi(props.project._id));
  //task-form details
  const [taskname, settaskname] = useState("");
  const [dateinput, setDateinput] = useState("2021-10-06");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [checkedArray] = useState([]);

  let isInValid = !taskname || !desc;
  const obj = useState("");
  const handleChange = (user) => {
    checkedArray.indexOf(user) == -1
      ? checkedArray.push(user)
      : checkedArray.splice(checkedArray.indexOf(user), 1);
    
  };

  const attendence = async (id) => {
    setShowModal("");

    const details = {
      checkedarray: checkedArray,
      taskid: id,
      projectid: props.project._id,
    };
    try {
      const { data } = await axios.post(postAttendenceApi(), details);
      if (data.error) {
        setError(error.message);
      } else {
        rerender();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    showform(false);
    if (!isInValid) {
      const createtask = {
        taskname: taskname,
        desc: desc,
        deadline: dateinput,
        projectid: props.project._id,
      };
      axios
        .post(postTaskApi(), createtask)
        .then(({ data }) => {
          if (data.error) {
            setError(data.error.message);
            return;
          }
          rerender();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      alert("check the fields");
    }
    console.log("project stored in db");
  };
  return (
    <div>
      <div className="container mx-auto  mt-8 w-4/5 flex flex-col space-y-4 justify-center items-center">
        {form ? (
          <form className="w-fit  p-5 flex flex-col items-center bg-white-light rounded-md border border-gray-800 border-opacity-30">
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
                  onChange={(e) => settaskname(e.target.value)}
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
                <textarea
                  className="bg-gray-200 appearance-none border-2 
                border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
                 focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
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
                  onChange={(e) => setDateinput(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center text-white-light">
              <div className=" flex m-2 p-2">
                <div>
                  <p className="font-medium underline">{error}</p>
                  <button
                    className="shadow m-2 bg-purple-600 hover:bg-purple-500  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleForm}
                  >
                    Assign Task
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => showform(false)}
                    className="shadow m-2 bg-purple-600 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <Transition
            as={React.Fragment}
            show={!form}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-110 "
          >
            <button
              onClick={() => showform(true)}
              className="items-center  w-full  h-20 rounded-md bg-violet-600 text-white-light text-center justify-center shadow-md hover:bg-opacity-80"
            >
              Assign new Task
            </button>
          </Transition>
        )}

        {!loading ? (
          State.map((task) => (
            <div
              className="bg-white w-full flex items-center p-2 rounded-xl shadow border px-4 "
              key={task._id}
            >
              <div className="flex items-center space-x-4 mr-4">
                <img
                  src="https://avatars2.githubusercontent.com/u/1490347?s=460&u=39d7a6b9bc030244e2c509119e5f64eabb2b1727&v=4"
                  alt="My profile"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div className="flex-grow p-3 border-l">
                <div className="font-semibold text-gray-700 text-2xl">
                  {task.taskname.toUpperCase()}
                </div>
                <div className="font-semibold text-gray-500">{task.desc}</div>
                <div className="text-sm text-gray-500">
                  {task.date.substring(0, 10)}
                </div>
              </div>
              <div className="p-2">
                <span className="block h-4 w-4  bottom-3  right-9 relative">
                  <button
                    className="p-2 items-center  rounded-md bg-violet-600 text-white-light "
                    onClick={() => setShowModal(task)}
                  >
                    view
                  </button>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>Loadinng</div>
        )}
      </div>

      {showModal && (
        <div className="h-screen">
          <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transform transition-all duration-150 ">
            <div className="relative w-auto my-6 mx-auto max-w-md h-max">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white-light outline-none focus:outline-none">
                {/*header*/}

                <div className="sm:max-w-lg w-full  pt-5 px-12 bg-white rounded-xl z-10">
                  {/* <span className="p-4 h-6 w-6 flex text-center justify-center items-center ml-auto  text-red-500  rounded-full float-right outline-none focus:outline-none">
                    <button className="" onClick={() => setShowModal("")}>
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span> */}
                  <div className="text-center">
                    <h2 className=" text-3xl font-bold text-gray-900">
                      {showModal.taskname}
                    </h2>
                  </div>
                  <form
                    className="mt-8 space-y-3 h-fit"
                    action="#"
                    method="POST"
                  >
                    <div className="overflow-y-scroll overflow-x-hidden h-3/4 max-h-60 scr space-y-4 p-2">
                      {showModal.Submissions.map((submit) => {
                        let { attendance } = showModal.status.find(
                          (eachUserStatus) => {
                            if (eachUserStatus.email == submit.user) {
                              return eachUserStatus;
                            }
                          }
                        );
                        return (
                          <div
                            className="grid grid-cols-1 space-y-2 relative hover:bg-gray-100 hover:bg-opacity-50  border border-gray-600 border-opacity-20 shadow-sm py-2 px-4 m-2 mx-3  my-2 rounded-md "
                            key={submit.taskid}
                          >
                            <label className="text-sm font-bold text-gray-500 tracking-wide">
                              {submit.user}
                            </label>
                            <div className="flex  justify-between">
                              <div className="flex-col">
                                <label className="text-sm font-bold   text-blue-700 tracking-wide">
                                  <a href={submit.link}> {submit.link}</a>
                                </label>
                                <br></br>
                                <label className="text-sm font-bold   text-black-700 tracking-wide">
                                  <a
                                    href={`http://localhost:5000/uploads/${submit.file}`}
                                  >
                                    {submit.file}
                                  </a>
                                </label>
                              </div>
                              <div className="group flex">
                                <input
                                  type="checkbox"
                                  className=" m-2 right-0 h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                                  id="mycheck"
                                  // defaultChecked={
                                  //   checkedArray.indexOf(submit.user) == -1
                                  //     ? false
                                  //     : true
                                  // }
                                  disabled={attendance || false}
                                  onClick={() => handleChange(submit.user)}
                                />
                                {attendance && (
                                  <div className="group-hover:block  bg-gray-800 bg-opacity-70 text-white-light  absolute top-9 right-12   py-1 px-2 text-xs rounded-sm hidden">
                                    alredy marked
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {!(showModal.Submissions.length > 0) && (
                        <div>not Yet posted</div>
                      )}
                    </div>

                    <div className="py-5">
                      <button
                        className="  text-green-best right-0 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => attendence(showModal._id)}
                      >
                        mark Attendence
                      </button>
                      <button
                        className="text-red-500 left-0 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal("")}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black transform-gpu transition-all duration-200"></div>
        </div>
      )}
    </div>
  );
}

export default Mentor;
