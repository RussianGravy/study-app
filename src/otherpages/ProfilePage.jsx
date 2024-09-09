import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navbar } from "../components/Navbar";
import { Deck } from "../components/Deck";
import { DeckDisplay } from "../components/DeckDisplay";
import { useDeck } from "../contexts/DeckContext";
import styles from "../components/custom_css/global.module.css";

export function ProfilePage() {
  const [username, setUsername] = useState("");
  const [decks, setDecks] = useState("");
  const deckValues = useDeck();
  const userEmail = deckValues.view;

  useEffect(() => {
    getUsername();
    getDecks();
  }, []); // getting initial values

  useEffect(() => {
    document.body.className = styles.homeBody;
    return () => {
      document.body.className = "";
    };
  }, []); // body styling for this page

  async function getUsername() {
    try {
      const ref = doc(db, userEmail, "username");
      setUsername((await getDoc(ref)).data().username);
    } catch (err) {
      console.error(err);
      setUsername("error getting name...");
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
      <Navbar currentPage={"Profile"} />{" "}
      <div className="mt-28 ml-20 portrait:ml-5 flex flex-row flex-wrap">
        <h1 className="text-blue-600 text-5xl portrait:text-3xl text-nowrap">
          {username}
        </h1>
        <h1 className="text-5xl portrait:text-3xl ml-3 text-nowrap">
          - Profile
        </h1>
      </div>
      <div className="w-11/12 h-1 mt-5 mx-auto bg-gray-400 text-white">.</div>
      <div className="w-10/12 mt-10 ml-20 portrait:ml-5 flex flex-row flex-wrap">
        {decks.length > 0 ? (
          <></> // <DeckDisplay decks={decks} show_name={false} />
        ) : (
          <h1 className="mt-5 ml-20 text-3xl">
            This user has no decks to share. Come back later.
          </h1>
        )}
      </div>
    </div>
  );
}
