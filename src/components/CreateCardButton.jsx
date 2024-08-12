import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const setNewTopic = (t) => {
  newTopic = t;
};
const setNewContent = (c) => {
  newContent = c;
};

export function CreateCardButton({ submitFunction }) {
  return (
    <button
      className="bg-blue-600 border border-blue-950 w-24 rounded-full flex fixed right-6 bottom-6 z-40 m-0 p-0 items-center justify-center"
      onClick={submitFunction}
    >
      <h1 className="text-white text-8xl p-0 text-center relative bottom-2">
        +
      </h1>
    </button>
    // <div className="bg-slate-300 relative flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black">
    //   <input
    //     onChange={(e) => {
    //       setNewTopic(e.target.value);
    //     }}
    //     type="text"
    //     placeholder="topic"
    //     className="my-4"
    //   ></input>
    //   <input
    //     onChange={(e) => {
    //       setNewContent(e.target.value);
    //     }}
    //     type="text"
    //     placeholder="content"
    //     className="my-4"
    //   ></input>
    //   <button
    //     onClick={submitFunction}
    //     className="bg-blue-600 text-white py-3 px-9 w-fit h-fit mx-auto"
    //   >
    //     Create
    //   </button>
    // </div>
  );
}

export var newTopic;
export var newContent;
