import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const temp = useAuth();
  async function handleSubmit() {
    try {
      await temp.logIn(email, password);
    } catch (err) {
      console.error(err);
      return;
    }
    navigate("/");
  }
  return (
    <div className="w-fit h-fit flex flex-col">
      <div className="h-max w-max flex flex-col bg-slate-200 px-8 py-3 rounded-lg">
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
        <button
          className="my-3 py-1 bg-blue-400 text-white h-full"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
      <div className="flex flex-row self-center">
        <p>No account?</p>
        <a className="ml-1  text-blue-600" href="/signup">
          Sign Up
        </a>
      </div>
    </div>
  );
}
