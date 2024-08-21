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
  const [currentDeck, setCurrentDeck] = useState("");
  const changeDeck = (deck) => {
    setCurrentDeck(deck);
  };
  const value = {
    currentDeck,
    changeDeck,
  };
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}
