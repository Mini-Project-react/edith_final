import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "./Navbar";
// import { GlobalContext } from "../context/GlobalContext";
import { FaTruckLoading } from "react-icons/fa";
export default function Anime({ addNew }) {
  const { id } = useParams();
  // const { addToWatchList, watchList, removeFromWatchList } =
  // useContext(GlobalContext);

  const [eachAnime, setEachAnime] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  let btnStyle =
    "w-full sm:w-auto flex items-center justify-center text-gray-800 font-medium bg-gray-800 bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-white border-opacity-10 transform-gpu hover:-translate-y-0.5 transition-all duration-150";
  useEffect(() => {
    // const local_list = watchList.find((anime) => anime.id === id);
    // if (local_list) {
    //   console.log("fetched from the local storage");
    //   setEachAnime((old) => {
    //     setisloading(false);
    //     setIsAdded(true);
    //     return local_list;
    //   });
    // } else
    fetch_data();
  }, []);
  const fetch_data = async () => {
    await axios.get(`http://localhost:5000/projects/${id}`).then((res) => {
      // const {
      //   data: { attributes },
      // } = res.data;
      // console.log(watchList);

      // setEachAnime({
      //   id,
      //   head: { ...attributes.titles },
      //   episode: attributes.episodeCount,
      //   seaFin: 3,
      //   type: attributes.showType,
      //   posterImage: attributes.posterImage,
      //   description: attributes.description,
      //   favoritesCount: attributes.favoritesCount,
      //   popularityRank: attributes.popularityRank,
      //   ageRating: attributes.ageRating,
      //   status: attributes.status,
      // });
      setEachAnime(res.data);
      setisloading(false);
    });
  };
  // bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500
  return (
    <div className="">
      {/* <div
        className="shadow-xl border border-white-duller border-opacity-10 bg-gradient-to-r from-purple-700 to-[#a65fec] px-4 sm:px-6 lg:px-16
        h-36 absolute top-0 left-0 right-0 -z-50"
      ></div>
      <nav className="flex">
        <h1>Edith</h1>
      </nav> */}
      {isloading ? (
        <div className="p-8 relative z-40 flex md:flex-row w-full flex-col">
          {/* contains two section img and those other text and title */}
          <div
            className="w-48 md:w-1/6 rounded-md h-40
         overflow-hidden shadow-xl hover:scale-105 bg-cgray-heavy transform-gpu  transition-all duration-200 ease-in-out selector select-none "
          >
            {eachAnime.poster ? (
              <img
                src={""}
                alt={eachAnime.en || eachAnime.en_jp || ""}
                className="object-fill select-none"
              />
            ) : (
              <div className=""></div>
            )}
          </div>
          <div className="p-4 w-full  text-cgray-700 flex flex-col pop ">
            <h1 className="text-2xl mx-2 font-bold truncate overflow-ellipsis">
              {`${eachAnime.head || ""}`}
            </h1>

            <div className="flex flex-col mt-6">
              <span className={btnStyle}>
                {/* text-white-light bg-gradient-to-rfrom-purple-700via-purple-600to-purple-500  bg-cgray-heavy bg-opacity-95 shadow-md rounded-md px-2 py-1 w-max flex flex-nowrap whitespace-nowrap items-center hover:translate-x-1 transform-gpu transition-all duration-200 */}
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="px-2">info</p>
              </span>
              <ul className="text-xl font-medium text-gray-800 list-disc ml-6 mt-3">
                <li>{eachAnime.ageRating || ""}</li>
                {eachAnime.episode && <li>{eachAnime.episode}</li>}
                <li>{eachAnime.status || ""}</li>
              </ul>
            </div>
            <div className="flex flex-col mt-6 h-auto">
              <span className={btnStyle}>
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
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <p className="px-2">description</p>
              </span>

              <p className="text-black mt-3">
                {eachAnime.description ||
                  `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores unde ipsum nesciunt quibusdam et possimus illo similique deserunt incidunt delectus, repudiandae molestiae quae accusantium fugiat. Fuga dolorem ullam quidem expedita.
              Tempora, minima, itaque architecto eius minus quos consectetur earum reiciendis eum, porro aut rem assumenda! Eius, delectus velit animi, incidunt voluptatem laborum unde laboriosam dicta, vel ea libero repellat deleniti.
              Quos quibusdam consequuntur eius, aliquam quisquam harum eligendi pariatur debitis repellat sapiente sequi porro vitae suscipit, officiis ab? Consequuntur nesciunt illum dolores et totam consequatur? Doloribus necessitatibus eveniet dignissimos? Magni!`}
              </p>
            </div>
            <div className="flex mt-6 gap-4 text-white-light ">
              <span
                className="btn1"
                onClick={() => {
                  // if (isAdded) {
                  //   removeFromWatchList(eachAnime.id);
                  //   setIsAdded(false);
                  // } else {
                  //   setIsAdded(addToWatchList(eachAnime));
                  //   setShowHint(true);
                  // }

                  console.log(" select-none", isAdded);
                }}
              >
                {!isAdded ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                <p className="px-2 ">{!isAdded ? "Add work" : "added"}</p>
              </span>
              <Button name="mark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
            {isAdded && (
              <div className="flex gap-4 items-center mt-4 text-black">
                <p>currently at</p>
                <input
                  type="number"
                  placeholder="enter"
                  className="text-white-light rounded-md shadow-md p-2 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 bg-opacity-40 placeholder-white-light
                  focus:outline-none outline-none border-none hover:bg-opacity-5"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen absolute top-0 left-0 bg-black -z-10 bg-opacity-30 text-center text-black flex items-center justify-center">
          <span
            className="border-4 border-l-cgray-900 shadow-sm border-opacity-30
           border-white-dull rounded-full p-4 animate-spin" 
          ></span>
        </div>
      )}
      {showHint && (
        <div className="w-full z-50 text-white-light  fixed bottom-8 left-0 box-border">
          <div
            className={`flex items-center  w-2/3 mx-auto py-4 px-2  md:w-3/5 bg-gray-800 rounded-md transform transition-all relative apply-fade`}
          >
            <div className="bg-yellow-400 mx-2 rounded-sm px-2  text-gray-800">
              hint
            </div>
            <p className="">Added to List</p>
            <button
              className="ml-auto px-2"
              onClick={() => {
                setShowHint(false);
              }}
            >
              💀
            </button>
          </div>
          {setInterval(() => {
            setShowHint(false);
          }, 3000)}
        </div>
      )}
    </div>
  );
}

const Button = ({ name, children }) => {
  return (
    <span className="w-full sm:w-auto flex items-center justify-center text-gray-800 font-medium  bg-opacity-0 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-cgray-700 border-opacity-30 transform-gpu hover:-translate-y-0.5 transition-all duration-150">
      {children}
      <p>{name}</p>
    </span>
  );
};
