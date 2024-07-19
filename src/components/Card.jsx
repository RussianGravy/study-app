import React from "react";
import ReactDOM from "react-dom";
import "./test.css";

export function Card({ topic, content }) {
  return (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black">
      <h1 className=" text-5xl">{topic}</h1>
      <p className=" text-3xl text-gray-700">{content}</p>
    </div>
  );
}
