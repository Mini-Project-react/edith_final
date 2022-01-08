import Project from "./Project";
export default function Search({ searchres, isLoading, message }) {
  return !message && !isLoading ? (
    <div className="w-full md:w-screen">
      <div className="flex flex-col w-auto md:items-center md:flex-row flex-wrap">
        {searchres.length > 0 &&
          searchres.map((each, index) => (
            <Project details={each} key={index} />
          ))}
      </div>
    </div>
  ) : message ? (
    <div>{message}</div>
  ) : (
    <div>loading</div>
  );
}
