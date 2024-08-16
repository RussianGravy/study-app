import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { useState } from "react";
import Auth from "../components/Auth.jsx";

export function LoginPage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex flex-row w-screen h-screen p-0 m-0 overflow-hidden">
      <div className="h-fit w-fit flex flex-row portrait:flex-col portrait:w-min self-center mx-auto">
        <h1 className="text-5xl w-fit landscape:mr-72 portrait:mb-6 portrait:text-center font-serif">
          Personal Study App
        </h1>
        <div className="m-auto p-0">
          <Auth></Auth>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 w-fit flex flex-row">
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
