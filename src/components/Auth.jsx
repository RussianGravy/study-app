import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // await redirect();
    } catch (err) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      // await redirect();
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  // async function redirect () {window.location.href = '/homepage';}
  //console.log("auth: " + auth?.currentUser?.email);
  return (
    <div className="h-max flex flex-col bg-slate-300 px-8 py-3 rounded-lg">
      <input
        className="my-3 outline"
        type="email"
        placeholder="Email..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        className="my-3 outline"
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button className="my-3 bg-blue-400 outline h-full" onClick={signIn}>
        Sign In
      </button>
      <button className="my-3 bg-gray-200 outline" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      <button className="my-3 bg-gray-300 outline" onClick={logOut}>
        Sign Out
      </button>
    </div>
  );
}
