import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";
import background from "../assets/background.png";

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
    <div className="flex flex-col">
      <h2 className="text-gray-600">Username:</h2>
      <input
        className="my-3 px-1 outline rounded-sm"
        type="username"
        value={username}
        placeholder="Username..."
        required
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
    </div>,
    <div className="flex flex-col">
      <h2 className="text-gray-600">Email:</h2>
      <input
        className="my-3 px-1 outline rounded-sm"
        type="email"
        value={email}
        placeholder={"Email..."}
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>,
    <div className="flex flex-col">
      <h2 className="text-gray-600">Password:</h2>
      <input
        className="my-3 px-1 outline rounded-sm"
        type="password"
        value={password}
        placeholder="Password..."
        required
        onChange={(e) => {
          setError("");
          setPassword(e.target.value);
        }}
      />
      <h2 className="text-gray-600">Confirm Password:</h2>
      <input
        className="my-3 px-1 outline rounded-sm"
        type="password"
        value={passwordConfirm}
        placeholder="Confirm Password..."
        required
        onChange={(e) => {
          setError("");
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
  ]; //end of input chain

  function checkForErrors() {
    if (username.length == 0) {
      setError("Username is blank.");
      return false;
    }
    if (email.length == 0 && chainIndex == 1) {
      setError("Email is blank.");
      return false;
    }
    if (!email.includes("@") && chainIndex == 1) {
      setError("Not a valid email.");
      return false;
    }
    if (password.length == 0 && chainIndex == 2) {
      setError("Empty password.");
      return false;
    }
    if (password != passwordConfirm) {
      setError("Match passwords.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit() {
    try {
      await temp.signUp(username, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <img
        src={background}
        className="w-full h-full fixed top-0 left-0 -z-10 opacity-20"
      />
      <div className="w-full portrait:w-max  h-max self-center mx-auto flex flex-row portrait:flex-col">
        <div className="mx-auto flex flex-col">
          <h1 className="mx-auto mb-4 text-5xl self-center">Sign Up</h1>
          <div className="w-72 h-max min-h-52 flex flex-col bg-slate-200 mb-5 mx-auto px-8 py-3 rounded-lg">
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
            {/* Main Content */}
            {inputChain[chainIndex]}
            {chainIndex < inputChain.length - 1 ? (
              <button
                className="mt-4 py-1 px-4 bg-blue-400 text-white h-fit rounded-sm"
                onClick={() => {
                  if (checkForErrors()) setChainIndex(chainIndex + 1);
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="my-3 py-1 px-4 bg-blue-400 text-white h-fit rounded-sm"
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
                  setError("");
                  setPassword("");
                  setPasswordConfirm("");
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
    </div>
  );
}
