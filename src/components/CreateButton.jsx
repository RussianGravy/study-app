import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const setNewTopic = (t) => {
  newTopic = t;
};
const setNewContent = (c) => {
  newContent = c;
};

export function CreateButton({ submitFunction }) {
  return (
    <button
      className="bg-blue-600 border border-blue-950 w-24 rounded-full flex fixed right-6 bottom-6 z-40 m-0 p-0 items-center justify-center"
      onClick={submitFunction}
    >
      <h1 className="text-white text-8xl p-0 text-center relative bottom-2">
        +
      </h1>
    </button>
  );
}

export var newTopic;
export var newContent;
