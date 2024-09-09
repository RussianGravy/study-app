import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navbar } from "../components/Navbar";
import { Deck } from "../components/Deck";
import { DeckDisplay } from "../components/DeckDisplay";
import { useDeck } from "../contexts/DeckContext";
import backgroundImage from "../assets/background.png";
import styles from "../components/custom_css/global.module.css";

export function ProfilePage() {
  const [username, setUsername] = useState("");
  const [decks, setDecks] = useState("");
  const { id } = useParams();

  useEffect(() => {
    document.body.className = styles.homeBody;
    return () => {
      document.body.className = "";
    };
  }, []);

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
