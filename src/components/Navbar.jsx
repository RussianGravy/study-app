import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth.jsx";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";
import main_logo_icon from "../assets/main_logo_icon.png";
import menu_icon from "../assets/menu_icon.png";
import "./custom_css/navbar.css";

export function Navbar({ currentPage }) {
  const navigate = useNavigate();
  const temp = useAuth();
  return (
    <div className="w-screen h-14 flex flex-row bg-gray-300 fixed z-40 border-b-2 border-gray-400">
      <div className="flex grow items-center p-0">
        <img src={main_logo_icon} className="w-10 ml-5 aspect-auto" />
        <h1 className="text-2xl ml-2 portrait:text-xl items-center font-serif">
          Social Studies
        </h1>
      </div>
      <div
        id="dropdown"
        className="flex flex-col items-end w-32 h-14 overflow-hidden hover:bg-slate-700"
      >
        <img
          src={menu_icon}
          className="w-10 aspect-square mx-auto my-2 rotate-180"
        />
        <div className="w-max right flex flex-col">
          <button
            onClick={() => {
              navigate("/");
            }}
            className={
              "hover:bg-blue-500 text-white text-lg portrait:text-lg py-3 mt-1 w-32 " +
              (currentPage === "Home" ? "text-blue-300" : "")
            }
          >
            Home
          </button>
          {/* <button
            onClick={() => {
              navigate("/profile");
            }}
            className={
              "hover:bg-blue-500 text-white text-lg portrait:text-lg py-3 mt-1 w-32 " +
              (currentPage === "Profile" ? "text-blue-300" : "")
            }
          >
            Profile
          </button> */}
          <button
            onClick={() => {
              window.open(
                "https://github.com/RussianGravy/study-app",
                "_blank"
              );
            }}
            className="hover:bg-blue-500 text-white text-lg portrait:text-lg py-3 mt-1 w-32"
          >
            GitHub
          </button>
          <button
            onClick={temp.logOut}
            className="hover:bg-blue-500 text-white text-lg portrait:text-lg py-3 mt-1 w-32"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
