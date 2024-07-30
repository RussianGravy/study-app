import React from "react";
import ReactDOM from "react-dom";
import { Auth } from "../components/Auth.jsx";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";

export function Navbar() {
  const temp = useAuth();
  console.log(temp.currentUser.email);
  return (
    <div className="w-screen h-fit flex flex-row bg-gray-400 fixed z-40">
      <div className="flex grow items-center p-0">
        <h1 className="w-fit mx-5 text-2xl portrait:text-lg items-center">
          {temp.currentUser.email}
        </h1>
      </div>
      <button
        onClick={temp.logOut}
        className="bg-blue-600 text-white text-2xl portrait:text-lg p-3 right"
      >
        Log Out
      </button>
    </div>
  );
}
