import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Deck } from "./Deck";
import { useDeck } from "../contexts/DeckContext";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

export function DeckDisplay({ decks, show_name }) {
  const [username, setUsername] = useState("");
  const temp = useAuth();
  const deckValues = useDeck();
  const navigate = useNavigate();

  async function getUsername() {
    try {
      const ref = doc(db, temp.currentUser.email, "username");
      setUsername((await getDoc(ref)).data().username);
    } catch (err) {
      console.error(err);
      setUsername("error getting name...");
    }
  }

  useEffect(() => {
    getUsername();
  }, []); // on first render

  function selectDeck(name) {
    deckValues.changeDeck(name);
    navigate("/deck/" + temp.currentUser.email + "/" + name);
  }

  return (
    <div className="bg-gray-50 bg-opacity-50 h-fit min-h-96 w-11/12 rounded-lg relative mx-auto">
      {show_name == true ? (
        <h1 className=" text-5xl text-nowrap portrait:text-2xl mt-5 ml-10 portrait:ml-3 flex flex-row">
          <h2 className="text-blue-600 mr-4 portrait:mr-2">{username}</h2>
          <h2 className="text-black">- Your Decks</h2>
        </h1>
      ) : (
        ""
      )}
      <div className="w-full h-max pl-8 portrait:pl-2 flex flex-row flex-nowrap overflow-x-scroll snap-x snap-mandatory">
        {decks.length > 0 ? (
          decks.map((name) => {
            return (
              // Add SNAP Effect to deck scrolling
              <section
                key={name}
                className="snap-start pl-5 portrait:pl-0 mr-12 my-14"
              >
                <Deck
                  title={name}
                  subject={""}
                  selectFunction={() => {
                    selectDeck(name);
                  }}
                />
              </section>
            );
          })
        ) : (
          <h2 className="my-8 ml-8 portrait:ml-0 py-2 portrait:pr-2 text-4xl portrait:text-xl text-gray-600">
            No decks to display. Press the 'plus' to begin your first deck.
          </h2>
        )}
      </div>
      {decks.length > 1 ? (
        <div className="absolute top-0 right-0 h-full w-8 portrait:w-6 rounded-lg from-transparent to-gray-500 bg-gradient-to-r"></div>
      ) : (
        ""
      )}
    </div>
  );
}
