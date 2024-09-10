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
    <div className="bg-slate-200 flex flex-col mx-5 my-14 w-80 h-fit min-h-96 p-3 rounded-lg border-2 border-black relative overflow-hidden">
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
      {/* TOPIC input ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
      <div className="mt-8 flex flex-wrap w-full">
        <textarea
          ref={topicRef}
          type="text"
          placeholder="topic"
          defaultValue={topic}
          className="w-72 h-fit max-h-40 mb-4 p-1 text-4xl text-gray-800 rounded-md text-wrap resize-none bg-slate-200 outline outline-1 outline-slate-400"
          onChange={(e) => {
            topic = e.target.value;
            setInputHeights(topic);
          }}
        />
        {/* CONTENT input ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
        <textarea
          ref={contentRef}
          type="text"
          placeholder="content"
          defaultValue={content}
          className="w-72 h-fit max-h-40 mb-4 p-1 text-3xl text-gray-800 rounded-md text-wrap resize-none bg-slate-200 outline outline-1 outline-slate-400"
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
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [toggle, setToggle] = useState(false);
  // input style variables:
  const topicRef = useRef(null);
  const contentRef = useRef(null);
  // dynamically grow input box
  function setInputHeights(box) {
    if (box === "topic")
      topicRef.current.style.height = topicRef.current.scrollHeight + "px";
    else
      contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }

  return (
    <div className="bg-slate-200 rounded-lg border-2 border-black w-fit h-fit min-h-96 my-14 p-3 flex flex-col relative">
      {/*  ~ ~ ~ ~ ~ ~ ~ ~ ~ Beginning of Header Buttons ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
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
      {/*  ~ ~ ~ ~ ~ ~ ~ ~ ~ Beginning of Input Fields ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
      <div className="w-full h-fit my-10 flex flex-row flex-nowrap">
        {!toggle ? (
          <textarea
            ref={topicRef}
            type="text"
            value={topic}
            placeholder="Front ... "
            className="w-72 h-12 max-h-64 p-2 mx-5 text-3xl text-wrap resize-none bg-transparent border-slate-500 border-b-2"
            onChange={(e) => {
              setTopic(e.target.value);
              setInputHeights("topic");
            }}
          />
        ) : (
          <textarea
            ref={contentRef}
            type="text"
            value={content}
            placeholder="Back ..."
            className="w-72 h-12 max-h-64 p-2 mx-5 text-3xl text-wrap resize-none bg-transparent border-slate-500 border-b-2"
            onChange={(e) => {
              setContent(e.target.value);
              setInputHeights("content");
            }}
          />
        )}
      </div>
      {/*  ~ ~ ~ ~ ~ ~ ~ ~ ~ End of Input Fields ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
      {!toggle ? (
        <button
          onClick={async () => {
            setToggle(!toggle);
          }}
          className="bg-blue-600 text-white w-52 mx-auto mt-20 py-1 rounded-md"
        >
          Next
        </button>
      ) : (
        <div className="w-fit h-fit mx-auto mt-20 flex flex-col">
          <button
            onClick={async () => {
              createFunction(topic, content);
            }}
            className="bg-blue-600 text-white w-52 py-1 rounded-md"
          >
            Create
          </button>
          <button
            className="text-gray-600 text-sm rounded-md py-1 mx-auto mt-3 w-14"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
} //end of create menu

export function DeleteMenu({ deleteFunction, closeFunction }) {
  return (
    <div className="bg-slate-200 flex flex-col mx-5 my-14 w-80 h-fit p-3 rounded-lg border-2 border-black relative overflow-hidden">
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

export function PageSettings({ closeFunction, deleteFunction }) {
  return (
    <div className="bg-gray-200 flex flex-col w-80 h-96 my-14 p-3 rounded-lg border-2 border-gray-400">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">Deck Settings</p>
        <button
          onClick={async () => {
            closeFunction();
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Close
        </button>
      </div>
      <button
        className="text-4xl m-auto p-3 rounded-md bg-red-500 text-white"
        onClick={deleteFunction}
      >
        Delete Deck
      </button>
    </div>
  );
}
