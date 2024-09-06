import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Modal } from "../components/Modal";
import { CreateButton } from "../components/CreateButton.jsx";
import { Deck } from "../components/Deck";
import { DeckDisplay } from "../components/DeckDisplay.jsx";
import { FriendDisplay } from "../components/FriendDisplay.jsx";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext";
import { useDeck } from "../contexts/DeckContext.js";
import backgroundImage from "../assets/background.png";
import styles from "../components/custom_css/global.module.css";

export function HomePage() {
  const [decks, setDecks] = useState("");
  const [newDeckName, setNewDeckName] = useState("");
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
      return ref;
    } catch (err) {
      console.error(err);
    }
  }

  async function getDeckList() {
    try {
      var tempDecks = (await getDoc(decksDocRef)).data().all_names;
      setDecks(tempDecks);
    } catch (err) {
      console.error(err);
    }
  }

  function createDeck(name) {
    if (!decks.includes(name)) {
      const colRef = collection(db, temp.currentUser.email + "/decks/" + name);
      const docRef = doc(colRef, "metadata"); // You can name this document anything you want
      setDoc(docRef, {
        createdAt: new Date(),
        name: name,
      })
        .then(() => {
          getDeckList(); // Refresh deck list
        })
        .catch((err) => {
          console.error("Error creating deck: ", err);
        });
      deleteDoc(docRef);
      var newString;
      if (decks.length > 0) newString = decks + ", " + name;
      else newString = name;
      setDoc(decksDocRef, { all_names: newString });
      getDeckList();
    }
    setModalToggle(false);
  }

  const CreateDeck = (
    <div className="w-fit h-fit mx-5 my-14 p-3 relative hover:cursor-pointer">
      <div
        className={
          "absolute top-3 bg-slate-300 w-80 h-96 rounded-lg border-2 border-black overflow-hidden -rotate-3"
        }
      ></div>
      <div className="bg-slate-300 flex flex-col w-80 h-96 p-3 rounded-lg border-2 border-black relative overflow-hidden">
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
        <div className="flex flex-wrap w-full">
          <input
            type="text"
            placeholder=" topic"
            className="w-11/12 mx-auto mt-10 mb-24 text-5xl bg-transparent border-slate-500 border-b-2 rounded-sm "
            onChange={(e) => {
              setNewDeckName(e.target.value);
            }}
          ></input>
        </div>
        <button
          onClick={async () => {
            createDeck(newDeckName);
            setNewDeckName("");
          }}
          className="bg-blue-600 text-white mx-auto py-1 w-10/12"
        >
          Create
        </button>
      </div>
    </div>
  ); //end of Create Deck;

  return (
    <div className="w-screen min-h-screen p-0 m-0 relative bg-gray-200 ">
      <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 z-0 opacity-20">
        <img className="h-full w-full aspect-auto" src={backgroundImage} />
      </div>
      <Navbar currentPage={"Home"} />
      <Modal toggle={modalToggle}>{CreateDeck}</Modal>
      <CreateButton
        submitFunction={() => {
          setModalToggle(true);
        }}
      />
      <div className="pt-20 pb-20 w-screen h-fit flex flex-row flex-wrap">
        {/* pb-20 */}
        {/* <UserDisplay /> */}
        <DeckDisplay decks={decks} show_name={true} />
        <FriendDisplay />
      </div>
    </div>
  );
}
