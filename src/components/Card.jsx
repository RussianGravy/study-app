import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { get } from "firebase/database";
import edit_icon from "../assets/edit_icon.png";

export function Card({ topic, content, deleteFunction, updateFunction }) {
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
      </div>
      <h1 className=" text-4xl">{topic}</h1>
      <p className=" text-2xl text-gray-700">{content}</p>
    </div>
  );
}
