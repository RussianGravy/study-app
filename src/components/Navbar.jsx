import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth.jsx";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";
import "./custom_css/navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  const temp = useAuth();
  return (
    <div className="w-screen h-14 flex flex-row bg-gray-300 fixed z-40 border-b-2 border-gray-400">
      <div className="flex grow items-center p-0">
        <h1 className="w-fit mx-5 text-2xl portrait:text-lg items-center">
          {temp.currentUser.email}
        </h1>
      </div>
      {/* <div id="dropdown" className="flex flex-col h-14 overflow-hidden">
        <button className="bg-blue-600 text-white text-2xl portrait:text-lg p-3 right">
          \/
        </button> */}
      <div className="w-max right flex flex-col">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-blue-600 text-white text-2xl portrait:text-lg py-3 w-28"
        >
          Decks
        </button>
        <button
          onClick={temp.logOut}
          className="bg-blue-600 text-white text-2xl portrait:text-lg py-3 w-28"
        >
          Log Out
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}
