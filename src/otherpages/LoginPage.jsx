import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { useState } from "react";
import Auth from "../components/Auth.jsx";

export function LoginPage() {
  return (
    <div className="flex flex-row w-screen h-screen p-0">
      <div className="h-fit w-fit flex flex-row portrait:flex-col portrait:w-min self-center mx-auto">
        <h1 className="text-5xl w-fit landscape:mr-72 font-serif">
          Personal Study App
        </h1>
        <div className="m-auto p-0">
          <Auth></Auth>
        </div>
      </div>
      <div className="fixed bottom-1 right-1">
        <h1>Click for the</h1>
      </div>
    </div>
  );
}
