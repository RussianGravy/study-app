import React from "react";
import ReactDOM from "react-dom";
import { auth } from "../config/firebase.js";
import { useState } from "react";
import Auth from "../components/Auth.jsx";

export function LoginPage() {
  //checkForSignIn();
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <div className="flex flex-row w-screen h-screen">
      <h1 className="text-5xl m-auto w-4/12">
        Personal Language Notebook App :-)
      </h1>
      <div className="flex flex-col m-auto">
        <Auth></Auth>
        {/* <label>Username</label>
                    <input type="text" id="username" name="username" className='outline'></input>
                    <label className=' mt-10'>Password</label>
                    <input type="text" id="password" name="password" className='outline'></input> */}
      </div>
    </div>
  );
}

const checkForSignIn = () => {
  console.log(auth.currentUser);
  if (auth.currentUser != undefined) {
    console.log("signed in");
    window.location.href = "/homepage";
  } else {
    console.log("you need to sign in");
    window.location.href = "/";
  }
};
