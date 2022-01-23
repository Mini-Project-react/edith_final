import React from "react";
import { ArrowRight, PlusSm } from "heroicons-react";
const Join = () => {
  return (
    <main>
      <div className="mb-5 flex items-center">
        <p className="font-semibold text-2xl">join with,</p>
        <ArrowRight />
      </div>
      <form class="w-full max-w-3xl">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-email"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              className="bg-white-duller appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white-light focus:border-blue-500 focus:border-opacity-30 shadow-sm transform-gpu transition-all focus:text-gray-800 "
              id="inline-email"
              type="text"
              placeholder="mentor@gmail.com"
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <Button name="join" />
          </div>
        </div>
      </form>
    </main>
  );
};
const Button = ({ name, children }) => {
  return (
    <div className="md:w-20 sm:w-auto flex items-center justify-center text-gray-800 font-medium  bg-opacity-0 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-md py-2 px-5 border border-cgray-700 border-opacity-30 transform-gpu hover:-translate-y-0.5 transition-all duration-150">
      {children}
      <p>{name}</p>
    </div>
  );
};

export default Join;
