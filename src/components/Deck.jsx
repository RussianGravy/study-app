import React, { useState } from "react";

export function Deck({ title, subject, selectFunction }) {
  const [angle1, setAngle1] = useState(getAngle());
  //   const [angle2, setAngle2] = useState(getAngle());
  function getAngle() {
    var rAng = Math.floor(Math.random() * 11);
    var rDir = Math.floor(Math.random() * 11);
    var angle;
    if (rAng >= 5) angle = "rotate-3";
    if (rAng < 5) angle = "rotate-6";
    // if (rDir > 5) angle = " -" + angle;

    return angle;
  } // end of getAngle
  return (
    <div
      className="w-fit h-fit mx-5 my-14 p-3 relative hover:cursor-pointer"
      onClick={selectFunction}
    >
      <div
        className={
          "absolute top-3 bg-slate-300 w-80 h-96 rounded-lg border-2 border-black overflow-hidden " +
          angle1
        }
      ></div>
      {/* <div className={"absolute top-3 bg-slate-300 w-80 h-96 rounded-lg border-2 border-black overflow-hidden " +  angle2}></div> */}
      <div className="bg-slate-300 flex flex-col w-80 h-96 rounded-lg border-2 border-black relative overflow-hidden">
        <div className="w-fit h-fit mx-auto mt-20 text-center text-gray-800">
          <h1 className="text-5xl">{title}</h1>
          <h2 className="text-3xl">{subject}</h2>
        </div>
      </div>
    </div>
  );
}
