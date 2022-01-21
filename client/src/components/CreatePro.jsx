import { useState } from "react";
import { AddTocurrentProjects } from "../features/projectReducer";
import axios from "axios";
import { postProjectApi } from "../helper";
import { useDispatch } from "react-redux";
import InputText from "./InputText";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
// import { FaCalendar, FaCalendarAlt } from "react-icons/fa";
export default function CreatePro() {
  const [members, setMembers] = useState([{ id: 1, memEmail: "default" }]);
  const [dateinput, setDateinput] = useState("2021-10-06");
  const [projectname, setProjectName] = useState("");
  const [desc, setDesc] = useState("");
  const [head, setHead] = useState("");
  const [error, setError] = useState("");
  const [mentor, setMentor]=useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  let isInValid = !projectname || !desc;
  const handleForm = async (e) => {
    e.preventDefault();
    console.log(members);
    if (!isInValid) {
      const createdProject = {
        projectname: projectname,
        teamleaderid: user.userId,
        desc: desc,
        head: head,
        mentor:mentor,
        deadline: dateinput,
        teamMembersMail: members,
      };
      axios
        .post(postProjectApi(), createdProject)
        .then(({ data }) => {
          if (data.error) {
            setError(data.error.message);
          } else {
            dispatch(AddTocurrentProjects(data.projectDetails));
            navigate("/profile");
          }
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
   
    <div className="">
      <form className="my-2 form">
        <InputText
          type="text"
          contentHead="ProjectName"
          placeholder="Edith"
          name="projectname"
          onChange={(e) => setProjectName(e.target.value)}
        />

        <InputText
          type="text"
          contentHead="what is it about"
          placeholder="a mern project"
          name="head"
          onChange={(e) => setHead(e.target.value)}
        />
        <InputText 
        type="text" 
        contentHead="Mentor"
         placeholder="mentor mail id"
         name="mentor"
         onChange={(e)=>setMentor(e.target.value)}
         />
        <div className="flex  mb-4">
          <div className="md:pr-4 md:w-1/6 text-center mr-3">
            <label className="font-medium ">Team mates</label>
          </div>
          <div className="md:w-1/2 flex  items-center text-gray-800">
            <div className="mr-2 cursor-pointer hover:opacity-80 text-gray-800 flex items-center opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className=" h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <div
              onClick={() =>
                members.length < 3 &&
                setMembers((mem) => [
                  ...mem,
                  { id: mem[mem.length - 1].id + 1 },
                ])
              }
              className="h-5 w-5 opacity-70 cursor-pointer hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>

        {members.map((mem, index) => (
          <div className="flex w-full mb-2" key={index}>
            <div className="md:w-1/6 w-0"></div>
            <div className="w-full md:w-1/2">
              <input
                className="bg-transparent appearance-none border-b-2 border-l-2 border-gray-800
                border-opacity-50 rounded w-full py-2 px-4  text-opacity-70 leading-tight focus:outline-none focus:bg-white focus:border-gray-800 focus:border-opacity-50 shadow-sm placeholder-gray-400 focus:bg-gray-300 transform transition-colors duration-300 focus:text-gray-800 focus:placeholder-gray-800"
                id={"contentHead"}
                type="text"
                placeholder={`user ${index + 1} email`}
                onChange={(e) => {
                  let newMem = members.map((mem) => {
                    if (index + 1 == mem.id) {
                      return { ...mem, memEmail: e.target.value };
                    }
                    return mem;
                  });
                  setMembers(newMem);
                }}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-nowrap w-full mb-6 items-start my-6">
          <div className="mr-2 w-1/6 md:text-center block whitespace-nowrap font-medium">
            Deadline
          </div>
          <div className="md:w-1/2 flex flex-nowrap flex-row items-center">
            <div className=" datepicker-toggle">
              <span className="datepicker-toggle-button">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                name="deadline"
                type="date"
                className="datepicker-input"
                onChange={(e) => setDateinput(e.target.value)}
              />
              <p className="whitespace-nowrap mx-8 text-gray-800 font-medium">
                {dateinput}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-nowrap w-full flex-col md:flex-row mb-6">
          {/* md:items-center */}
          <div className="md:pr-4 md:w-1/6 md:text-center">
            <label
              htmlFor=""
              className="block whitespace-nowrap mb-2 font-medium"
            >
              description
            </label>
          </div>
          <div className="md:w-1/2">
            <textarea
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              className="bg-gray-800 appearance-none border-2 border-gray-800
    border-opacity-5 rounded w-full py-2 px-4 text-white-light text-opacity-70 leading-tight focus:outline-none focus:bg-white focus:border-gray-800 focus:border-opacity-50 shadow-sm placeholder-gray-400 focus:bg-gray-300 transform transition-colors duration-300 focus:text-gray-800 focus:placeholder-gray-800"
              placeholder="make it as long as you can"
            />
          </div>
        </div>
        <p className="font-medium underline">{error}</p>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={handleForm}
        >
          Button
        </button>
      </form>
    </div>
 
  );
}

// 1.team name
// 2.team member count
// 3.member details
// (member name,email)
// 4.project name
// 5.start date(optional)
// 6.deadline(optional)
// 7.description
/*import { useState } from "react";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";
export default function CreatePro() {
  const [members, setMembers] = useState([{ id: 1, memEmail: "default" }]);
  return (
    <div className="">
      <div className="font-medium text-xl">Create a New Project</div>
      <form className="my-2 md:w-10/12 mx-auto">
        <InputText
          type="text"
          contentHead="name of the project"
          placeholder="my mobile app"
        />
        <InputText
          type="text"
          contentHead="squad name!"
          placeholder="wild cheatas"
        />
        <div className="w-full flex justify-between mb-2">
          <div className="md:w-1/3">
            <label
              htmlFor={"contentHead"}
              className="block whitespace-nowrap mb-2 font-medium md:text-right md:pr-4"
            >
              {"Add members"}
            </label>
          </div>
          <div className="md:w-1/2 md:mr-auto flex justify-end items-center">
            <div className="h-5 w-5 mr-2 opacity-50 cursor-pointer hover:opacity-80 text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <div
              onClick={() =>
                members.length < 3 &&
                setMembers((mem) => [...mem, { id: mem[mem.length - 1].id }])
              }
              className="h-5 w-5 opacity-50 cursor-pointer hover:opacity-80 text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>

        {members.map((mem, index) => (
          <div className="flex flex-nowrap w-full flex-col    mb-2">
            <div className="md:w-3/5 md:mx-auto">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-800
    border-opacity-5 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow-sm"
                id={"contentHead"}
                type="text"
                placeholder={`member ${index + 1} email`}
              />
            </div>
          </div>
        ))}
        <div className=" flex items-center mb-2 text-center ">
          <div className="md:w-1/3 mr-4 relative">
            <label
              htmlFor={"contentHead"}
              className="block whitespace-nowrap mb-2 font-medium md:text-right md:pr-4"
            >
              {"Deadline"}
            </label>
          </div>
          <div class="datepicker-toggle">
            <span class="datepicker-toggle-button">
              <FaCalendar />
            </span>
            <input
              type="date"
              class="datepicker-input"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
const InputText = ({ type, contentHead, placeholder }) => (
  <div className="flex flex-nowrap w-full flex-col md:flex-row   mb-2">
  <div className="md:w-1/3">
      <label
        htmlFor={contentHead}
        className="block whitespace-nowrap mb-2 font-medium md:text-right md:pr-4"
      >
        {contentHead}
      </label>
    </div>
    <div className="md:w-1/2">
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-800
    border-opacity-5 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow-sm"
        id={contentHead}
        type={type}
        placeholder={placeholder}
      />
    </div>
  </div>
);
*/
