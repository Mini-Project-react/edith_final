import React from "react";
import { useParams } from "react-router";
import Mentor from "../components/Mentor";
import Team from "../components/Team";
import Altuser from "./Altuser.png";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userReducer";
import { Loader } from ".";
import { useFetch } from "../use-fetch";

export default function ProjectDetails() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { State, loading, error } = useFetch(
    `http://localhost:5000/api/projects/show/${id}`
  );
  const TeamMates = (teamMembersMail) => (
    <div
      className="flex bg-gray-100 border-b-2 w-full border-gray-200 flex-col text-gray-600 text-xs font-semibold max-w-lg p-3  pl-6 text-left shadow-md hover:shadow-lg lg:mx-auto rounded-xl"
      draggable="true"
    >
      <div className="flex flex-col space-y-2 mt-2">
        {user.email === teamMembersMail.memEmail ? (
          <>
            <span className=" text-gray-200 lg:mb-0" draggable="true">
              {State.teamleaderid}
            </span>
            <span>Team leader</span>
          </>
        ) : (
          <>
            <span className=" text-gray-800 text-lg lg:mb-0" draggable="true">
              {teamMembersMail.memEmail}
            </span>
            <span>Member</span>
          </>
        )}
      </div>

      <div className="flex w-full justify-between items-center py-4 px-2">
        {/* <img
          className="inline-block object-cover object-center   w-16 h-16 mt-4 rounded-full"
          alt="testimonial"
          src={Altuser}
        /> */}
        <MockIcon size="bb" />

        <button className="btn-pri">Message</button>
      </div>
    </div>
  );
  return !error ? (
    !loading ? (
      <section>
        <div className="relative w-full px-5 py-2 mx-auto md:px-12 lg:px-24 max-w-12xl">
          <div className="grid w-full grid-cols-1 mx-auto">
            <div className="max-w-full p-6">
              <div
                className="inline-flex items-center
    justify-center flex-shrink-0 w-12 h-12 mb-5
    text-blue-600 rounded-full  bg-blue-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 icon icon-tabler icon-tabler-aperture"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={12} cy={12} r={9} />
                  <line x1="3.6" y1={15} x2="14.15" y2={15} />
                  <line
                    x1="3.6"
                    y1={15}
                    x2="14.15"
                    y2={15}
                    transform="rotate(72 12 12)"
                  />
                  <line
                    x1="3.6"
                    y1={15}
                    x2="14.15"
                    y2={15}
                    transform="rotate(144 12 12)"
                  />
                  <line
                    x1="3.6"
                    y1={15}
                    x2="14.15"
                    y2={15}
                    transform="rotate(216 12 12)"
                  />
                  <line
                    x1="3.6"
                    y1={15}
                    x2="14.15"
                    y2={15}
                    transform="rotate(288 12 12)"
                  />
                </svg>
              </div>
              <h1
                className="
    text-2xl inline-flex ml-4
    font-semibold
    text-neutral-600
    lg:text-3xl
  "
              >
                {State.projectname}
              </h1>
              <span className="">
                <h1 className="leading-none tracking-tighter text-xl text-neutral-400 lg:text-1xl font-medium mb-2">
                  {State.head}
                </h1>
                <p className="text-base leading-relaxed text-gray-500">
                  {State.desc}
                </p>
              </span>
              <p className="  text-2xl">Mentor: {State.mentor}</p>
            </div>
          </div>
        </div>

        <div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            .component-selected {\n              box-sizing: border-box;\n            }\n\n\t\t\t\t\t\t.component-selected--active {\n              outline: 1px solid #2094ff;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t.component-selected:not(.component-selected--active):hover {\n\t\t\t\t\t\t\toutline: 1px dashed #2094ff;\n\t\t\t\t\t\t}\n          ",
            }}
          />
          <div id="canvas-wrapper" className="opacity-100 css-1tuwe4k eozmaqc0">
            <div
              className="emptyblock"
              style={{ paddingTop: "0px", paddingBottom: "0px" }}
            >
              <section>
                <div
                  className="relative items-center w-full px-5 py-5 mx-auto md:px-12 lg:px-24 max-w-7xl"
                  draggable="true"
                >
                  <div
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                    draggable="true"
                  >
                    {State.teamMembersMail.map(TeamMates)}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {user.email === State.mentor ? (
          <Mentor projectid={id} />
        ) : (
          <Team projectid={id} />
        )}
      </section>
    ) : (
      <Loader />
    )
  ) : (
    <>something happened</>
  );
}

const MockIcon = ({ size }) => (
  <div
    className="inline-flex items-center
justify-center flex-shrink-0 w-9 h-9
text-blue-600 rounded-full  bg-blue-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 icon icon-tabler icon-tabler-aperture"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx={12} cy={12} r={9} />
      <line x1="3.6" y1={15} x2="14.15" y2={15} />
      <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(72 12 12)" />
      <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(144 12 12)" />
      <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(216 12 12)" />
      <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(288 12 12)" />
    </svg>
  </div>
);
