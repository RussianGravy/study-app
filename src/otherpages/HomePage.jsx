import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Modal } from "../components/Modal";
import { CreateButton } from "../components/CreateButton.jsx";
import { Deck } from "../components/Deck";
import { DeckDisplay } from "../components/DeckDisplay.jsx";
import { FriendDisplay } from "../components/FriendDisplay.jsx";
import { collection, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext";
import { useDeck } from "../contexts/DeckContext.js";
import backgroundImage from "../assets/background.png";
import styles from "../components/custom_css/global.module.css";

export function HomePage() {
  const [decks, setDecks] = useState([]);
  const [rawDecksString, setRawDecksString] = useState("");
  const [newDeckName, setNewDeckName] = useState("");
  const [modalToggle, setModalToggle] = useState(false);
  const navigate = useNavigate();
  const temp = useAuth();
  const deckValues = useDeck();
  const [deckMetaData, setDeckMetaData] = useState([]); // metadata such as last_accessed

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
      var all_names = (await getDoc(decksDocRef)).data().all_names.split(",");
      setRawDecksString(all_names);
      const compareTimeStamps = (a, b) => {
        return b - a;
      };

      const tempDecks = await Promise.all(
        all_names.map(async (n) => {
          return { name: n, ...(await getDeckMetaData(n)) };
        }),
      );

      tempDecks.sort((a, b) => {
        return compareTimeStamps(a.last_accessed, b.last_accessed);
      });

      setDecks(tempDecks);
    } catch (err) {
      console.error(err);
    }
  }

  /*
   * queries for metadata association with the deck in the argument
   * if exists, return it, else set meta_data with default data and return that
   */
  async function getDeckMetaData(deck) {
    const defaultMetaData = { last_accessed: null };
    const ref = doc(db, temp.currentUser.email + "/decks/" + deck, "meta_data");
    const metaData = await getDoc(ref);

    if (metaData.exists()) {
      return metaData.data();
    } else {
      return defaultMetaData;
    }
  }

  async function createDeck(name) {
    if (!decks.some((d) => d.name === name)) {
      const colRef = collection(db, temp.currentUser.email + "/decks/" + name);
      const docRef = doc(colRef, "meta_data"); // You can name this document anything you want
      const meta_data = {
        last_accessed: Date.now(),
      };
      try {
        await setDoc(docRef, meta_data);
      } catch (err) {
        console.error("Error creating deck: ", err);
      }
      var newString;
      if (decks.length > 0) {
        newString = rawDecksString + "," + name;
      } else {
        newString = name;
      }
      setDoc(decksDocRef, { all_names: newString }).then(() => getDeckList());
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
        <DeckDisplay decks={decks.map((d) => d.name)} show_name={true} />
        <FriendDisplay />
      </div>
    </div>
  );
}
