import React from "react";

export function EditMenu({
  defaultTopic,
  defaultContent,
  updateFunction,
  closeFunction,
}) {
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
      <div className="mt-8 flex flex-wrap w-full">
        <h1>Topic</h1>
        <input
          type="text"
          placeholder="topic"
          defaultValue={topic}
          className="w-fit mb-4 text-3xl rounded-xl"
          onChange={(e) => {
            topic = e.target.value;
          }}
        />
        <h1>Content</h1>
        <input
          type="text"
          placeholder="content"
          defaultValue={content}
          className="w-fit mb-4 text-3xl rounded-xl"
          onChange={(e) => {
            content = e.target.value;
          }}
        />
      </div>
      <button
        onClick={async () => {
          updateFunction(topic, content);
        }}
        className="bg-blue-600 text-white mx-auto py-1 px-7"
      >
        Update
      </button>
    </div>
  );
}

export function NewCardMenu({ createFunction, closeFunction }) {
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
          <input
            type="text"
            placeholder=" topic"
            className="w-11/12 h-fit text-5xl rounded-xl mb-2 text-wrap"
            onChange={(e) => {
              topic = e.target.value;
            }}
          ></input>
          <input
            type="text"
            placeholder=" content"
            className="w-11/12 max-w-fit  text-3xl rounded-xl"
            onChange={(e) => {
              content = e.target.value;
            }}
          ></input>
        </div>
      </div>
      <button
        onClick={async () => {
          createFunction(topic, content);
        }}
        className="bg-blue-600 text-white mx-auto py-1 px-7"
      >
        Create
      </button>
    </div>
  );
}

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
}
