import React from "react";

const Template = () => (
  <div
    className="md:max-w-sm w-full
mr-4 my-2 md:w-96 md:hover:-translate-y-2 transform transition ease-in-out duration-150"
  >
    <div className="animate-pulse flex space-x-1">
      <div className="rounded-md overflow-hidden shadow-md mr-2 bg-gray-800 h-32 w-24"></div>
      <div
        className="flex-1 space-y-8 py-1 hover:bg-gray-300 flex flex-col rounded-md bg-cgray-700  text-white-light text-opacity-75 border-2 border-cgray-900 border-opacity-10 p-4 hover:text-black md:max-w-lg  DropShadow w-40
  "
      >
        {/* <div className="h-4 w-20 bg-green-best rounded-sm px-2 py-1 shadow-md "></div>
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-2 bg-gray-700 rounded col-span-2"></div>
        <div className="h-2 bg-gray-700 rounded col-span-1"></div>
      </div>
      <div className="h-2 bg-gray-700 rounded"></div>
    </div> */}
      </div>
    </div>
  </div>
);
const Mock = ({ limit }) => {
  return (
    <div className="flex flex-col w-full md:items-center md:flex-row flex-wrap">
      {limit.map((x, index) => (
        <Template key={index} />
      ))}
    </div>
  );
};

export default Mock;
