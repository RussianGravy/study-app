import React, { useState } from "react";
import ReactDOM from "react-dom";
import { get } from "firebase/database";
import edit_icon from "../assets/edit_icon.png";
import flip_icon from "../assets/flip_icon.png";

export function Card({ topic, content, deleteFunction, updateFunction }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black relative overflow-hidden"
      draggable
    >
      <div className="text-5xl h-7 w-full self-center flex flex-row-reverse z-30 center">
        <button
          className="text-slate-700 font-bold text-3xl w-7 h-7 rounded-full flex items-center justify-center" //bg-red-600
          onClick={deleteFunction}
        >
          X
        </button>
        <button
          className="text-slate-700 font-bold text-2xl w-7 h-7 mr-3 rounded-full " //bg-blue-600
          onClick={updateFunction}
        >
          <img src={edit_icon} className="w-full" />
        </button>
        <button
          className="text-slate-700 font-bold text-3xl w-7 h-7 mr-auto ml-2 rounded-full flex items-center justify-center"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <img src={flip_icon} className="w-full" />
        </button>
      </div>
      {toggle ? (
        <p className=" text-2xl text-gray-700 mx-auto my-14">{content}</p>
      ) : (
        <h1 className="text-4xl text-center mx-auto my-14">{topic}</h1>
      )}
    </div>
  );
}
