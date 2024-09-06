import React from "react";

export function PrettyThing() {
  return (
    <>
      <div className="mt-20 mx-auto relative">
        <div
          className={
            "absolute -rotate-12 bg-blue-300 rounded-lg border-2 border-black overflow-hidden flex -z-10"
          }
          style={{
            width: "24vw",
            aspectRatio: "80/96",
            top: "3vw",
            right: "22vw",
          }}
        >
          <h1
            className="mx-auto text-black text-7xl text-center font-serif"
            style={{ fontSize: "5.5vw", marginTop: "7vw" }}
          >
            Make
          </h1>
        </div>
        <div
          className={
            "bg-blue-300 rounded-lg border-2 border-black overflow-hidden"
          }
          style={{ width: "24vw", aspectRatio: "80/96" }}
        >
          <h1
            className="mx-auto text-black text-7xl text-center font-serif "
            style={{ fontSize: "5.5vw", marginTop: "7vw" }}
          >
            Share
          </h1>
        </div>
        <div
          className={
            "absolute rotate-12 bg-blue-300 rounded-lg border-2 border-black overflow-hidden flex -z-10"
          }
          style={{
            width: "24vw",
            aspectRatio: "80/96",
            top: "3vw",
            left: "22vw",
          }}
        >
          <h1
            className="mx-auto text-black text-7xl text-center font-serif"
            style={{ fontSize: "5.5vw", marginTop: "7vw" }}
          >
            Study
          </h1>
        </div>
      </div>
    </>
  );
}
