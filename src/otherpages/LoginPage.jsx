import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import Auth from "../components/Auth.jsx";
import styles from "../components/custom_css/global.module.css";
import background from "../assets/background.png";

export function LoginPage() {
  const [error, setError] = useState("");
  useEffect(() => {
    document.body.className = styles.loginBody;
    return () => {
      document.body.className = "";
    };
  }, []);
  return (
    <div className="relative flex flex-row w-screen h-screen p-0 m-0 overflow-hidden">
      {/* <Navbar /> */}
      <img
        src={background}
        className="w-full h-full fixed top-0 left-0 -z-10 opacity-20"
      />
      <div className="h-fit w-fit flex flex-row portrait:flex-col portrait:w-min self-center mx-auto">
        <div className="w-fit landscape:mr-72 portrait:mb-6 flex flex-row">
          <h1 className="text-5xl text-center font-serif ">
            The Social Study-App
          </h1>
        </div>
        <div className="m-auto p-0">
          {/* Error Message  */}
          {error.length > 0 ? (
            <div className="w-fit h-max mx-auto mb-3 px-4 py-2 rounded-md bg-red-500 outline outline-red-300 flex flex-row flex-nowrap">
              <h1 className=" text-white text-sm text-nowrap">
                {"Error: " + error}
              </h1>
              <button
                className="ml-3 text-white text-sm font-bold"
                onClick={() => {
                  setError("");
                }}
              >
                X
              </button>
            </div>
          ) : (
            ""
          )}
          <Auth></Auth>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 w-fit flex flex-row">
        <h1>Click for the</h1>{" "}
        <a
          href="https://github.com/RussianGravy/study-app"
          className="ml-1 text-blue-400"
        >
          Repo
        </a>
      </div>
    </div>
  );
}
