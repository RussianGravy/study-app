import React, { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import main_logo_icon from "../assets/main_logo_icon.png";
import menu_icon from "../assets/menu_icon.png";
import "./custom_css/navbar.css";

export function Navbar({ currentPage }) {
  const [page, setPage] = useState(currentPage);
  const [username, setUsername] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const temp = useAuth();

  useEffect(() => {
    if (temp.currentUser?.email != null) getUsername();
  }, [id]);

  async function getUsername() {
    try {
      const ref = doc(db, temp.currentUser.email, "username");
      const data = (await getDoc(ref)).data().username;
      setUsername(data);
    } catch (err) {
      console.error(err);
      setUsername("error getting name...");
    }
  }

  return (
    <div className="w-screen h-14 flex flex-row bg-white fixed z-40 border-b-2 border-gray-400">
      <div className="flex grow items-center p-0">
        <img src={main_logo_icon} className="w-10 ml-5 aspect-auto" />
        <h1 className="text-2xl ml-2 portrait:text-xl items-center font-serif">
          Social Studies
        </h1>
      </div>
      {temp.currentUser != null ? (
        <div
          id="dropdown"
          className="flex flex-col items-end w-32 h-14 overflow-hidden hover:bg-white hover:border hover:border-b-neutral-700"
        >
          <img
            src={menu_icon}
            className="w-10 aspect-square mx-auto my-2 rotate-180"
          />
          <div className="w-max right flex flex-col">
            <button
              onClick={() => {
                navigate("/");
              }}
              className={
                "hover:bg-blue-500 text-lg portrait:text-lg py-3 mt-1 w-32 " +
                (page === "Home" ? "text-gray-400" : "text-black")
              }
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                navigate("/profile/" + username);
              }}
              className={
                "hover:bg-blue-500 text-lg portrait:text-lg py-3 mt-1 w-32 " +
                (page === "profile/" + username
                  ? "text-gray-400"
                  : "text-black")
              }
            >
              Profile
            </button>
            <button
              onClick={() => {
                window.open(
                  "https://github.com/RussianGravy/study-app",
                  "_blank",
                );
              }}
              className="hover:bg-blue-500 text-black text-lg portrait:text-lg py-3 mt-1 w-32"
            >
              GitHub
            </button>
            <button
              onClick={temp.logOut}
              className="hover:bg-blue-500 text-black text-lg portrait:text-lg py-3 mt-1 w-32"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-32 portrait:w-24 mr-5 py-1 text-blue-600 text-lg portrait:text-sm self-center rounded-2xl outline outline-blue-600 hover:bg-blue-200"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
