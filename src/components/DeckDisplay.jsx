import React from "react";
import { useNavigate } from "react-router-dom";
import { Deck } from "./Deck";
import { useDeck } from "../contexts/DeckContext";

export function DeckDisplay({ decks }) {
  const deckValues = useDeck();
  const navigate = useNavigate();

  function selectDeck(name) {
    deckValues.changeDeck(name);
    navigate("/deck");
  }

  return (
    <div className="bg-gray-600 h-fit min-h-96 w-7/12 portrait:w-11/12 rounded-lg relative mx-auto">
      <h1 className="text-white text-5xl mt-5 ml-10">Your Decks</h1>
      <div className="w-full h-max pl-8 portrait:pl-2 flex flex-row flex-nowrap overflow-x-scroll">
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
          <h2 className="my-8 ml-8 py-2 text-4xl text-gray-300">
            No decks to display. Press the 'plus' to begin your first deck.
          </h2>
        )}
      </div>
      {decks.split(",").length > 1 ? (
        <div className="absolute top-0 right-0 h-full w-16 portrait:w-8 rounded-lg from-transparent to-gray-800 bg-gradient-to-r"></div>
      ) : (
        ""
      )}
    </div>
  );
}
