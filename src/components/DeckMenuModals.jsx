import React, { useEffect, useRef, useState } from "react";

export function EditMenu({
  defaultTopic,
  defaultContent,
  updateFunction,
  closeFunction,
}) {
  // input style variables:
  const [topicInputHeight, setTopicInputHeight] = useState(0);
  const [contentInputHeight, setContentInputHeight] = useState(0);
  const topicRef = useRef(null);
  const contentRef = useRef(null);
  // dynamically grow input box
  function setInputHeights(x = "") {
    topicRef.current.style.height = topicRef.current.scrollHeight + "px";
    console.log(
      "topic: " +
        topicRef.current.scrollHeight +
        ", rows: " +
        topicRef.current.rows +
        ", cols: " +
        topicRef.current.cols
    );
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
    //testy bulshit below (using topic)
    const TOPIC_COL_CHAR_RATIO = 20 / 16;
    var temp = (x.length * TOPIC_COL_CHAR_RATIO) / 20 + 0.5;
    console.log(Math.floor(temp));
  }
  useEffect(() => {
    setInputHeights();
  }, []);
  // update variables:
  var topic = defaultTopic;
  var content = defaultContent;
  return (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-fit p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">Editing Card</p>
        <button
          onClick={async () => {
            closeFunction();
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Cancel
        </button>
      </div>
      {/* TOPIC input ~ ~ ~ ~ */}
      <div className="mt-8 flex flex-wrap w-full">
        <textarea
          ref={topicRef}
          type="text"
          placeholder="topic"
          defaultValue={topic}
          className="w-72 h-fit max-h-40 mb-4 p-1 text-4xl text-gray-800 rounded-md text-wrap resize-none bg-slate-100 outline outline-2 outline-slate-400"
          onChange={(e) => {
            topic = e.target.value;
            setInputHeights(topic);
          }}
        />
        {/* CONTENT input ~ ~ ~ ~ */}
        <textarea
          ref={contentRef}
          type="text"
          placeholder="content"
          defaultValue={content}
          className="w-72 h-fit max-h-40 mb-4 p-1 text-3xl text-gray-800 rounded-md text-wrap resize-none bg-slate-100 outline outline-2 outline-slate-400"
          onChange={(e) => {
            content = e.target.value;
            setInputHeights();
          }}
        />
      </div>
      <button
        onClick={async () => {
          updateFunction(topic, content);
        }}
        className="bg-blue-600 text-white mx-auto py-1 px-7 rounded-lg"
      >
        Update
      </button>
    </div>
  );
} //end of edit menu

export function NewCardMenu({ createFunction, closeFunction }) {
  // input style variables:
  const [topicInputHeight, setTopicInputHeight] = useState(0);
  const [contentInputHeight, setContentInputHeight] = useState(0);
  const topicRef = useRef(null);
  const contentRef = useRef(null);
  // dynamically grow input box
  function setInputHeights() {
    topicRef.current.style.height = topicRef.current.scrollHeight + "px";
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }
  useEffect(() => {
    setInputHeights();
  }, []);
  // input variables
  var topic = "";
  var content = "";
  return (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">New Card</p>
        <button
          onClick={async () => {
            closeFunction();
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Cancel
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="mx-1 my-9 w-fit">
          <textarea
            ref={topicRef}
            type="text"
            placeholder="topic"
            className="w-72 max-h-40 text-5xl p-2 rounded-xl mb-2 text-wrap resize-none bg-slate-100 outline outline-2 outline-slate-400"
            onChange={(e) => {
              topic = e.target.value;
              setInputHeights();
            }}
          />
          <textarea
            ref={contentRef}
            type="text"
            placeholder="content"
            className="w-72 max-h-40 max-w-fit p-2 text-3xl rounded-xl resize-none bg-slate-100 outline outline-2 outline-slate-400"
            onChange={(e) => {
              content = e.target.value;
              setInputHeights();
            }}
          />
        </div>
      </div>
      <button
        onClick={async () => {
          createFunction(topic, content);
        }}
        className="bg-blue-600 text-white mx-auto py-1 px-7 rounded-md"
      >
        Create
      </button>
    </div>
  );
} //end of create menu

export function DeleteMenu({ deleteFunction, closeFunction }) {
  return (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-fit p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">Deleting Card</p>
        <button
          onClick={async () => {
            closeFunction();
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Cancel
        </button>
      </div>
      <div className="w-fit mx-auto my-8 text-xl">
        Are you Sure?{" "}
        <button
          className="text-blue-600"
          onClick={async () => {
            deleteFunction();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
} //end of delete menu
