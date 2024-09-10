import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import { Deck } from "../components/Deck";
import { DeckDisplay } from "../components/DeckDisplay";
import { useDeck } from "../contexts/DeckContext";
import edit_icon from "../assets/edit_icon.png";
import backgroundImage from "../assets/background.png";
import styles from "../components/custom_css/global.module.css";

export function ProfilePage() {
  const [userEmail, setUserEmail] = useState("");
  const [decks, setDecks] = useState("");
  const { id } = useParams();
  const temp = useAuth();

  useEffect(() => {
    document.body.className = styles.homeBody;
    return () => {
      document.body.className = "";
    };
  }, []); // setting body styles

  useEffect(() => {
    getUserEmail();
  }, []); // initializing user email

  useEffect(() => {
    getDecks();
  }, [userEmail]); // initializing decks

  async function getUserEmail() {
    try {
      const ref = doc(db, "global_data", "users");
      const data = await (await getDoc(ref)).data()[id];
      setUserEmail(data);
      console.log(id + ", " + data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getDecks() {
    try {
      const ref = doc(db, userEmail, "decks");
      const names = (await getDoc(ref)).data().all_names;
      setDecks(names);
    } catch (err) {
      console.error(err);
      setDecks("");
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 z-0 opacity-20">
        <img className="h-full w-full aspect-auto" src={backgroundImage} />
      </div>
      <Navbar currentPage={"profile/" + id} />
      <div className="mt-28 ml-20 portrait:ml-5 flex flex-row flex-wrap">
        <h1 className="text-blue-600 text-5xl portrait:text-3xl text-nowrap">
          {id}
        </h1>
        <h1 className="text-5xl portrait:text-3xl ml-3 text-nowrap">
          - Profile
        </h1>
        {userEmail == temp.currentUser.email ? (
          <button
            className="w-9 h-9 portrait:w-7 portrait:h-7 aspect-square p-1 mt-1 portrait:mt-0 ml-4 portrait:ml-2 self-center bg-blue-600 rounded-md"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <img
              src={edit_icon}
              className="w-full h-full invert brightness-0"
            />
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="w-11/12 h-1 mt-5 mx-auto bg-gray-400 text-white">.</div>
      <div className="w-10/12 mt-10 ml-20 portrait:ml-5 flex flex-row flex-wrap">
        {decks.length > 0 ? (
          <></> // <DeckDisplay decks={decks} show_name={false} />
        ) : (
          <h1 className="w-full mt-5 portrait:text-center text-3xl">
            This user has no decks to share. Come back later.
          </h1>
        )}
      </div>
    </div>
  );
}
