import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";

export function SignUpPage() {
  //states and variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [chainIndex, setChainIndex] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const temp = useAuth();

  // input chain and supporting functions
  const inputChain = [
    <input
      className="my-3 px-1 outline rounded-sm"
      type="username"
      value={username}
      placeholder="Username..."
      required
      onChange={(e) => {
        setUsername(e.target.value);
      }}
    />,
    <input
      className="my-3 px-1 outline rounded-sm"
      type="email"
      value={email}
      placeholder={"Email..."}
      required
      onChange={(e) => {
        setEmail(e.target.value);
      }}
    />,
    <div className="flex flex-col">
      <input
        className="my-3 px-1 outline rounded-sm"
        type="password"
        value={password}
        placeholder="Password..."
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        className="my-3 px-1 outline rounded-sm"
        type="password"
        value={passwordConfirm}
        placeholder="Confirm Password..."
        required
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
    </div>,
    <div className="flex flex-col">
      <h1 className="m-auto my-2 text-gray-800 text-2xl underline">Review</h1>
      <h1 className="my-3 text-gray-600 text-2xl">Username: {username}</h1>
      <h1 className="my-3 text-gray-600 text-2xl">Email: {email}</h1>
      <h1 className="my-3 text-gray-600 text-2xl">Password: {password}</h1>
    </div>,
  ];

  async function handleSubmit() {
    if (password !== passwordConfirm) {
      console.log("passwords do not match");
      return;
    }
    try {
      await temp.signUp(username, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="w-max h-max self-center mx-auto flex flex-col">
        {error}
        <h1 className=" text-5xl self-center">Sign Up</h1>
        <div className="h-max w-max flex flex-col bg-slate-200 mt-10 mb-5 mx-auto px-8 py-3 rounded-lg">
          {inputChain[chainIndex]}
          {chainIndex < inputChain.length - 1 ? (
            <button
              className="py-1 px-4 bg-blue-400 text-white h-full rounded-sm"
              onClick={() => {
                setChainIndex(chainIndex + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button
              className="my-3 py-1 px-4 bg-blue-400 text-white h-full rounded-sm"
              onClick={handleSubmit}
              type="submit"
            >
              Sign Up
            </button>
          )}
          {chainIndex >= 1 ? (
            <button
              className="my-1 text-sm text-gray-600"
              onClick={() => {
                setChainIndex(chainIndex - 1);
              }}
            >
              Back
            </button>
          ) : (
            ""
          )}
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
{
  /* <button
className="my-1 text-sm text-gray-600"
onClick={() => {
  setChainIndex(chainIndex - 1);
}}
>
Back
</button> */
}
