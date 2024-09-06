import React, { useState, createContext, useContext } from "react";
import { auth } from "../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
} from "firebase/auth";

const DeckContext = createContext("");

export function useDeck() {
  return useContext(DeckContext);
}

export function DeckProvider({ children }) {
  // states
  const [view, setView] = useState("");
  const [currentDeck, setCurrentDeck] = useState("");
  //supporting functions
  const changeView = (view) => {
    setView(view);
  };
  const changeDeck = (deck) => {
    setCurrentDeck(deck);
  };

  //value
  const value = {
    currentDeck,
    changeDeck,
    view,
    changeView,
  };
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}
