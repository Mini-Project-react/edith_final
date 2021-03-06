import React from "react";
import { useFetch } from "../use-fetch";
import { useState } from "react";
import Upload from "./upload.png";
import { getProjectsApi, getTaskApi ,getCurrUser} from "../helper";
import { postFilesApi } from "../helper";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
import { useEffect } from "react";
import tick from './tick.png'
function Team(props) {
  const user = useSelector(selectUser);
  const [showModal, setShowModal] = React.useState("");
 
  // actual tasks to display
  const [tasks, setTasks] = useState([]);
  // tasks from, server as backup to set the tasks when the get emptied while searching through them
  const [State, loading , rerender] = useFetch(getTaskApi(props.project._id));
  const obj=props.project.marks.find(o=>o.memid===user.email)
  const [link, setLink] = useState("");

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  let isInValid = !link;
  useEffect(() => {
    setTasks(State);
  }, [State]);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSearch = ({ target: { value } }) => {
    if (value) {
      setTasks(
        State.filter((task) => {
          if (
            task.taskname
              .replaceAll(/\s/g, "")
              .toLocaleLowerCase()
              .includes(value.trim().toLocaleLowerCase())
          ) {
            return task;
          }
        })
      );
    } else {
      setTasks(State);
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(postFilesApi(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hrs = date_ob.getHours();
    let min = date_ob.getMinutes();

    if (!isInValid) {
      const upload = {
        link: link,
        taskid: showModal._id,
        teammember: user.email,
        date: year + "-" + month + "-" + date,
        time: hrs + ":" + min,
        filename: filename,
      };
      axios
        .post(postFilesApi(), upload)
        .then(({ data }) => {
          if (data.error) {
            // setError(data.error.message);
          } //else {
          //   // dispatch(AddTocurrentProjects(data.projectDetails));
          //   navigate("/profile");
          // }
        })
        .catch((err) => {
          // setError(err.message);
        });
    } else {
      alert("check the fields");
    }
    setShowModal("");
    rerender();
    console.log("project stored in db");
    getTaskApi(props.project._id);
  };
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">Task</h2>
          <span className="text-xs">All tasks given</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              onChange={handleSearch}
              placeholder="search..."
            />
          </div>
          <div className="lg:ml-40 ml-auto flex space-x-2 h-10">
          {console.log("vvaaaaa", obj)}
          attendence:{!loading?(obj.points+"/"+State.length):("loading...")}
          
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name and Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    start date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    End date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Upload
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  tasks.length > 0 ? (
                    tasks.map((task) => (
                      <>
                        <tr key={task.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {task.taskname}{" "}
                                </p>
                                <p className="text-gray-500 whitespace-no-wrap">
                                  {task.desc}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {task.date.substring(0, 10)}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {task.deadline}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {task.status.find(o=>o.email===user.email)
                                ? "Submited"
                                : "Pending"}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {task.status.find(o=>o.email===user.email)
                            ?  <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img
                              className="object-cover  h-fit"
                              
                              src={tick}
                              alt=""
                              
                            />
                            <div className="group-hover:block  bg-gray-800 bg-opacity-70 text-white-light  absolute top-9 right-12   py-1 px-2 text-xs rounded-sm hidden">
                            alredy marked
                          </div>
                          </div>
                            :  <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img
                              className="object-cover  h-fit"
                              onClick={() => setShowModal(task)}
                              src={Upload}
                              alt=""
                              
                            />
                          </div>} 
                         
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      no res found
                    </div>
                  )
                ) : (
                  <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    Loading
                  </div>
                )}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 4 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
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

                <div className="sm:max-w-lg w-full pt-5 px-12 bg-white rounded-xl z-10">
                  <div className="text-center">
                    <button
                      className="p-2 ml-auto  bg-red-500 border-0  rounded-full  text-white-duller float-right text-lg leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal("")}
                    >
                      X
                    </button>
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                      File Upload!<br></br>
                      {showModal.taskname}
                    </h2>
                  </div>
                  <form
                    className="mt-8 space-y-3"
                    action="#"
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div className="grid grid-cols-1 space-y-2">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Link
                      </label>
                      <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type
                        placeholder="mail@gmail.com"
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Attach Document
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 p-10 group text-center">
                          <input type="file" onChange={onChange} />
                        </label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      <span>File type: doc,pdf,types of images</span>
                    </p>
                    <div>
                      <button
                        type="submit"
                        className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                        onClick={handleForm}
                      >
                        Upload
                      </button>
                      <button
                        type="submit"
                        className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}

export default Team;
