import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Modal } from "../components/Modal";
import { CreateCardButton } from "../components/CreateCardButton";
import { Deck } from "../components/Deck";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext";
import { useDeck } from "../contexts/DeckContext.js";
import styles from "../components/custom_css/global.module.css";

export function HomePage() {
  const [decks, setDecks] = useState([]);
  /* { title: "test", subject: "test" } */
  const [modalToggle, setModalToggle] = useState(false);
  const navigate = useNavigate();
  const temp = useAuth();
  const deckValues = useDeck();

  const decksDocRef = getDocRef(); //reference (not doc itself)

  useEffect(() => {
    document.body.className = styles.homeBody;
    return () => {
      document.body.className = "";
    };
  }, []); // body styling for this page

  useEffect(() => {
    deckValues.changeDeck("");
    getDeckList();
  }, []); // on load

  function getDocRef() {
    //removing 'async' fixed it
    try {
      const ref = doc(db, temp.currentUser.email + "", "decks");
      console.log(ref);
      return ref;
    } catch (err) {
      console.error(err);
    }
  }

  async function getDeckList() {
    try {
      var tempArr = (await getDoc(decksDocRef)).data().all_names.split(",");
      setDecks(tempArr);
    } catch (err) {
      console.error(err);
    }
  }

  function selectDeck(name) {
    deckValues.changeDeck(name);
    console.log("current deck set to " + deckValues.currentDeck);
    navigate("/deck");
  }

  const CreateDeck = (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">New Deck</p>
        <button
          onClick={async () => {
            await setModalToggle(false);
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  ); //end of Create Deck;

  return (
    <div className="w-screen min-h-screen p-0 m-0 relative bg-slate-500">
      <Navbar></Navbar>
      <Modal toggle={modalToggle}>{CreateDeck}</Modal>
      <CreateCardButton
        submitFunction={() => {
          setModalToggle(true);
        }}
      ></CreateCardButton>
      <div className="pt-5 pb-10 w-screen flex flex-col">
        <h1 className="text-white text-5xl mt-20 ml-10">Your Decks</h1>
        <div className="w-auto px-8 h-max flex flex-row flex-nowrap overflow-x-scroll">
          {decks.length > 0 ? (
            decks.map((name) => {
              return (
                <Deck
                  title={name}
                  subject={""}
                  selectFunction={() => {
                    selectDeck(name);
                  }}
                  key={name}
                ></Deck>
              );
            })
          ) : (
            <h2 className="mt-8 ml-12 text-4xl text-gray-300">
              No decks to display. Press the 'plus' to begin your first deck.
            </h2>
          )}
        </div>
        <h1 className="text-white text-5xl mt-10 ml-10">Friends</h1>
        <h2 className="mt-8 ml-12 text-4xl text-gray-300">
          no users to friend
        </h2>
      </div>
    </div>
  );
}
