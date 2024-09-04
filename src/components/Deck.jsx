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
      className="w-fit h-fit p-3 relative cursor-pointer" //portrait:ml-0 portrait:mr-20
      onClick={selectFunction}
    >
      <div
        className={
          "absolute top-3 bg-blue-300 w-80 h-96 rounded-lg border-2 border-black overflow-hidden " +
          angle1
        }
      ></div>
      <div className="bg-blue-300 flex flex-col w-80 h-96 rounded-lg border-2 border-black relative overflow-hidden">
        <div className="w-full h-full bg-blue-300 flex flex-col z-0">
          <div className="w-fit h-fit mx-auto mt-20 text-center text-black">
            <h1 className="text-5xl">{title}</h1>
            <h2 className="text-3xl">{subject}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
