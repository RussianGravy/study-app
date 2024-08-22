import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Modal } from "../components/Modal";
import { CreateCardButton } from "../components/CreateCardButton";
import { Deck } from "../components/Deck";
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

  function selectDeck(name) {
    deckValues.changeDeck(name);
    navigate("/deck");
  }

  function createDeck(name) {
    if (!decks.includes(name)) {
      console.log("creating " + newDeckName);
      const colRef = collection(db, temp.currentUser.email + "/decks/" + name);
      const docRef = doc(colRef, "metadata"); // You can name this document anything you want
      setDoc(docRef, {
        createdAt: new Date(),
        name: name,
      })
        .then(() => {
          console.log("Deck created successfully!");
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
            className="w-11/12 text-5xl rounded-xl mx-auto mt-10 mb-24"
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
        <div className="bg-gray-600 h-fit w-11/12 rounded-lg m-auto mt-5 relative">
          <div className="w-full h-max px-8 flex flex-row flex-nowrap overflow-x-scroll">
            {decks.length > 0 ? (
              decks.split(",").map((name) => {
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
              <h2 className="my-auto ml-6 py-2 text-4xl text-gray-300">
                No decks to display. Press the 'plus' to begin your first deck.
              </h2>
            )}
          </div>
          {decks.split(",").length > 1 ? (
            <div className="absolute top-0 right-0 h-full w-28 from-transparent to-gray-700 bg-gradient-to-r"></div>
          ) : (
            ""
          )}
        </div>
        <h1 className="text-white text-5xl mt-10 ml-10">Friends</h1>
        <h2 className="mt-8 ml-14 text-4xl text-gray-300">
          No users to friend.
        </h2>
      </div>
    </div>
  );
}
