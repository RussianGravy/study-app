import React from "react";

export function FriendDisplay() {
  return (
    <div className="w-fit h-fit flex flex-col mt-10 ml-10">
      <h1 className="text-white text-5xl mt-10 ml-10">Friends</h1>
      <h2 className="h-fit rounded-lg bg-gray-600 text-gray-300  mt-8 ml-14 text-4xl text-center">
        No users to friend.
      </h2>
    </div>
  );
}
