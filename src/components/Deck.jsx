import React, { useState } from "react";

export function Deck({ title, subject, selectFunction }) {
  const [angle1, setAngle1] = useState(getAngle());
  function getAngle() {
    var angle;
    var rAng = Math.floor(Math.random() * 11);
    if (rAng >= 5) angle = "rotate-3";
    if (rAng < 5) angle = "rotate-6";

    return angle;
  } // end of getAngle
  return (
    <div
      className="w-fit h-fit mx-8 portrait:ml-0 portrait:mr-20 my-14 p-3 relative"
      onClick={selectFunction}
    >
      <div
        className={
          "absolute top-3 bg-slate-300 w-80 h-96 rounded-lg border-2 border-black overflow-hidden " +
          angle1
        }
      ></div>
      <div className="bg-slate-300 flex flex-col w-80 h-96 rounded-lg border-2 border-black relative overflow-hidden">
        <div className="w-full h-full bg-slate-300 flex flex-col z-0">
          <div className="w-fit h-fit mx-auto mt-20 text-center text-gray-800s">
            <h1 className="text-5xl">{title}</h1>
            <h2 className="text-3xl">{subject}</h2>
          </div>
          {/* <HoverMenu /> */}
        </div>
      </div>
    </div>
  );
}

function HoverMenu({ submitFunction }) {
  return (
    <div className="bg-slate-300 w-full h-full absolute top-0 left-0 items-center flex flex-col">
      <div className="text-white w-fit h-fit m-auto flex flex-col">
        <button className="w-fit px-10 py-5 bg-blue-500 shadow-md rounded-lg mx-auto mb-7">
          Open
        </button>
        <button className="w-fit px-5 py-1 bg-blue-500 shadow-md rounded-lg mx-auto mb-7">
          Delete
        </button>
        <button className="w-fit px-5 py-1 bg-blue-500 shadow-md rounded-lg mx-auto mb-16">
          Edit
        </button>
      </div>
    </div>
  );
}
