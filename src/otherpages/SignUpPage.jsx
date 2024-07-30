import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";

export function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const temp = useAuth();
  async function handleSubmit() {
    if (password !== passwordConfirm) {
      console.log("passwords do not match");
      return;
    }
    try {
      await temp.signUp(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="w-screen h-screen flex">
      <div className="w-max h-max self-center m-auto flex flex-col">
        <h1 className=" text-5xl self-center mb-4">Sign Up</h1>
        <div className="h-max w-max flex flex-col bg-slate-200 px-8 py-3 rounded-lg">
          <input
            className="my-3 outline"
            type="email"
            placeholder="Email..."
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="my-3 outline"
            type="password"
            placeholder="Password..."
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="my-3 outline"
            type="password"
            placeholder="Confirm Password..."
            required
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <button
            className="my-3 py-1 bg-blue-400 text-white h-full"
            onClick={handleSubmit}
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="flex flex-row self-center">
          <p>Have an account?</p>
          <a className="ml-1  text-blue-600" href="/login">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
