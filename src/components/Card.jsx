import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { get } from "firebase/database";

export function Card({ topic, content, deleteFunction, updateFunction }) {
  //Edit-menu variables and functions
  // const [toggleVariable, setToggleVariable] = useState(-1);
  // const toggleEditMenu = () => {
  //   setToggleVariable(toggleVariable * -1);
  // };
  // const getStyles = () => {
  //   if (toggleVariable > 0) {
  //     return "m-0 p-0 bg-slate-300 w-full h-full absolute top-0 left-0 flex flex-col"; //show menu
  //   } else {
  //     return "opacity-0 pointer-events-none"; //hide menu
  //   }
  // };
  return (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex flex-row-reverse z-30">
        <button
          className="text-white text-xl w-7 h-7 rounded-full bg-red-600"
          onClick={deleteFunction}
        >
          X
        </button>
        <button
          className="text-white text-xl w-7 h-7 mr-3 rounded-full bg-blue-600"
          onClick={updateFunction}
        >
          E
        </button>
      </div>
      <h1 className=" text-5xl">{topic}</h1>
      <p className=" text-3xl text-gray-700">{content}</p>
      {/* <div className={getStyles()}>
        <div className="mx-3 my-9 w-fit">
          <input
            type="text"
            placeholder={topic}
            className="w-fit text-5xl"
            onChange={(e) => {
              updatedTopic = e.target.value;
            }}
          ></input>
          <input
            type="text"
            placeholder={content}
            className="w-fit text-3xl"
            onChange={(e) => {
              updatedContent = e.target.value;
            }}
          ></input>
        </div>
        <button
          onClick={() => {
            updateFunction();
            toggleEditMenu();
          }}
          className="bg-blue-600 text-white mx-auto py-1 px-7"
        >
          Update
        </button>
      </div> */}
    </div>
  );
}
