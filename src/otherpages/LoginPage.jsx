import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { useState } from "react";
import Auth from "../components/Auth.jsx";

export function LoginPage() {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="h-fit w-fit flex flex-row self-center mx-auto">
        <h1 className="text-5xl w-fit mr-72 font-serif">
          Personal Language App
        </h1>
        <div className="flex flex-col m-auto">
          <Auth></Auth>
          {/* <label>Username</label>
                    <input type="text" id="username" name="username" className='outline'></input>
                    <label className=' mt-10'>Password</label>
                    <input type="text" id="password" name="password" className='outline'></input> */}
        </div>
      </div>
    </div>
  );
}
