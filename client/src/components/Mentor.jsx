import React from 'react';
import { useState } from "react";
function Mentor() {
  const [form, showform] = useState(false);
  return (

    <div>

      <div className='flex flex-col justify-center items-center'>


        {form ? (
          <form className="w-full max-w-2xl p-5 shadow-2xl flex flex-col items-center ">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Task Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="ADD CSS" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                  Task description
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'></textarea>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Dead Line
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="date" />
              </div>
            </div>
            <div className="md:flex md:items-center">
            
              <div className=" flex m-2 p-2">
                <div>
                  <button className="shadow m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Assign Task
                  </button>
                </div>
                <div>
                  <button onClick={() => showform(false) }className="shadow m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>) : (<div className='bg-white-light shadow-xl md:w-2/3 p-4 m-3'><button onClick={() => showform(true)} className='p-3 ml-5 rounded-md bg-violet-600 text-white-light'>Assign new Task</button></div>)}
      </div>
    </div>
  );
}

export default Mentor;
