import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { auth, googleProvider, db } from "../config/firebase.js";
import { getDocs, collection, addDoc } from "firebase/firestore";

export function CreateCardButton() {
  //New card states
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardContent, setNewCardContent] = useState("");

  const [cardList, setCardList] = useState([]);
  const cardsCollectionsRef = collection(db, "testCollection");
  const getCardList = async () => {
    //Read the data
    try {
      const data = await getDocs(cardsCollectionsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCardList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
    //Set card list
  };
  useEffect(() => {
    getCardList();
  });

  const submitCard = async () => {
    try {
      await addDoc(cardsCollectionsRef, {
        title: newCardTitle,
        content: newCardContent,
      });
      window.location.href = "./homepage";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-96 p-3 rounded-lg border-2 border-black">
      <input
        onChange={(e) => {
          setNewCardTitle(e.target.value);
        }}
        type="text"
        placeholder="topic"
        className="my-4"
      ></input>
      <input
        onChange={(e) => {
          setNewCardContent(e.target.value);
        }}
        type="text"
        placeholder="content"
        className="my-4"
      ></input>
      <button
        onClick={submitCard}
        className="bg-blue-600 text-white py-3 px-9 w-fit h-fit mx-auto"
      >
        Create
      </button>
    </div>
  );
}
