const InputText = ({ type, contentHead, placeholder }) => (
  <div
    className="flex flex-nowrap w-full flex-col md:flex-row mb-6
     md:items-center"
  >
    {/* md:items-center */}
    <div className="md:pr-4 md:w-1/6 md:text-center ">
      <label
        htmlFor={contentHead}
        className="block whitespace-nowrap  font-medium  "
      >
        {contentHead}
      </label>
    </div>
    <div className="md:w-1/2">
      <input
        className="bg-gray-800 appearance-none border-2 border-gray-800
      border-opacity-5 rounded w-full py-2 px-4 text-white-light text-opacity-70 leading-tight focus:outline-none focus:bg-white focus:border-gray-800 focus:border-opacity-50 shadow-sm placeholder-gray-400 focus:bg-gray-300 transform transition-colors duration-300 focus:text-gray-800 focus:placeholder-gray-800"
        id={contentHead}
        type={type}
        placeholder={placeholder}
      />
    </div>
  </div>
);
export default InputText;
