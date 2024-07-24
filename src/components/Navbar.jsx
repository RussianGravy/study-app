import React from "react";
import ReactDOM from "react-dom";
import { Auth } from "../components/Auth.jsx";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { signOut } from "firebase/auth";

export function Navbar() {
  // console.log("navbar: " + auth?.currentUser?.email);
  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="w-screen h-fit flex flex-row bg-gray-400 fixed z-40">
      <div className="flex grow items-center">
        <h1 className="w-fit mx-5 text-2xl items-center">
          {auth.currentUser?.email && "nothing"}
        </h1>
      </div>
      <button
        onClick={logOut}
        className="bg-blue-600 text-white text-2xl p-3 right"
      >
        Log Out
      </button>
    </div>
  );
}
