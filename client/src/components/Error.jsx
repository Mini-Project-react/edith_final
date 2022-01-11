import { useState, useEffect } from "react";

const err_emoji = [
  "¯_(ツ)_/¯",
  ":-(",
  "(•_•)",
  "(⊙_⊙)",

  "(^///^)",
  "🕳",
  "X_X",
  ":/",
  "^3^",
  "~_~",
  ";[",
  "+_+",
  "¬_¬",
  "^_+",
  ">.<",
  "-_-",
  "^_-",
  "Y.Y",
  "=(",
];
const Error = () => {
  // const [msg] = useState([
  //   "¯_(ツ)_/¯",
  //   ":-(",
  //   "(•_•)",
  //   "(⊙_⊙)",

  //   "(^///^)",
  //   "🕳",
  //   "X_X",
  //   ":/",
  //   "^3^",
  //   "~_~",
  //   ";[",
  //   "+_+",
  //   "¬_¬",
  //   "^_+",
  //   ">.<",
  //   "-_-",
  //   "^_-",
  //   "Y.Y",
  //   "=(",
  // ]);
  const [index, setindex] = useState(0);

  useEffect(() => {
    setindex(Math.floor(Math.random() * (err_emoji.length + 1)));
  }, []);
  return (
    <main className="h-full flex items-center justify-center ">
      <div className="text-xs text-center text-black text-opacity-80 mt-40">
        <p className="text-7xl p-4 ">{err_emoji[index] || "🕳"}</p>
        <span className="">page not found yet...</span>
      </div>
    </main>
  );
};

export default Error;
