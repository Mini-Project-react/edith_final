import React from 'react'
import axios from "axios";
import { useParams } from "react-router";
import Mentor from "../components/Mentor";
import Team from "../components/Team";
import Altuser from "./Altuser.png";
import { useContext, useEffect, useState } from "react";
function ProjectDetails() {
    const [data, setData] = useState({});
    const [isloading, setisloading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        fetch_data();
      }, []);

      const fetch_data = async () => {
        await axios.get(`http://localhost:5000/api/projects/show/${id}`).then((res) => {

          setData(res.data.response);
          console.log(res.data.response);
          setisloading(false);
        });
      };



  return (!isloading?(<section>
    <div className="
relative

w-full
px-5
py-5
mx-auto
md:px-12
lg:px-24
max-w-12xl
">
      <div className="grid w-full grid-cols-1 mx-auto">
        <div className="max-w-lg p-6 mx-auto">
          <div className="
    inline-flex
    items-center
    justify-center
    flex-shrink-0
    w-12
    h-12
    mx-auto
    mb-5
    text-blue-600
    rounded-full
    bg-blue-50
  ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon icon-tabler icon-tabler-aperture" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx={12} cy={12} r={9} />
              <line x1="3.6" y1={15} x2="14.15" y2={15} />
              <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(72 12 12)" />
              <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(144 12 12)" />
              <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(216 12 12)" />
              <line x1="3.6" y1={15} x2="14.15" y2={15} transform="rotate(288 12 12)" />
            </svg>
          </div>
          <h1 className="
    mx-auto
    mb-8
    text-2xl
    font-semibold
    leading-none
    tracking-tighter

    text-neutral-600
    lg:text-3xl
  "> {data.projectname}</h1>
  <h1 className="
  mx-auto
  mb-8
  text-2xl
  font-semibold
  leading-none
  tracking-tighter
  text-neutral-400
  lg:text-1xl
  
"> {data.head}</h1>
          <p className="mx-auto text-base leading-relaxed text-gray-500"> {data.desc} </p>
          <p>{data.mentor}</p>
          {data.teamMembersMail.map((teamMembersMail)=>(<p>{teamMembersMail.memEmail}</p>))}
        </div>
      </div>
    </div>
    <div>
        <style dangerouslySetInnerHTML={{__html: "\n            .component-selected {\n              box-sizing: border-box;\n            }\n\n\t\t\t\t\t\t.component-selected--active {\n              outline: 1px solid #2094ff;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t.component-selected:not(.component-selected--active):hover {\n\t\t\t\t\t\t\toutline: 1px dashed #2094ff;\n\t\t\t\t\t\t}\n          " }} />
        <div id="canvas-wrapper" className="opacity-100 css-1tuwe4k eozmaqc0"><div className="emptyblock" style={{paddingTop: '0px', paddingBottom: '0px'}}>
            <section>
             <div  className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl" draggable="true">
                <div  className="grid grid-cols-1 gap-6 lg:grid-cols-3" draggable="true">

                {data.teamMembersMail.map((teamMembersMail)=>(
                   <div  className="flex flex-col w-full max-w-lg p-8 text-left shadow-2xl lg:mx-auto rounded-xl" draggable="true">
                       <h2  className="mt-4 text-xs font-semibold tracking-widest text-blue-500 " draggable="true">
                           <span>{teamMembersMail.memEmail}</span>
                              <span  href="#" className="font-semibold text-gray-200 lg:mb-0" draggable="true">
                                <br></br><span>Acme's HR</span>
                              </span>
                        </h2>
                        <img className="inline-block object-cover object-center w-20 h-20 mt-8 rounded-full" alt="testimonial" src={Altuser}/>
                    </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    <Mentor/>

    <Team/>
  </section>
  ):(
    <div>not loading</div>
  ))}

export default ProjectDetails
