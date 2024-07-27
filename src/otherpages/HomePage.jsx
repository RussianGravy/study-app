import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import Auth from "../components/Auth.jsx";
import { Card, updatedContent, updatedTopic } from "../components/Card.jsx";
import {
  CreateCardButton,
  newContent,
  newTopic,
} from "../components/CreateCardButton.jsx";
import { auth, googleProvider, db } from "../config/firebase.js";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export function HomePage() {
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
    } catch (err) {
      console.error(err);
    }
    //Set card list
  };
  useEffect(() => {
    getCardList();
  }, []);

  const submitCard = async () => {
    try {
      await addDoc(cardsCollectionsRef, {
        title: newTopic,
        content: newContent,
        userId: auth?.currentUser?.uid,
      });
      getCardList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCard = async (id) => {
    try {
      const cardDoc = doc(db, "testCollection", id);
      await deleteDoc(cardDoc);
      getCardList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCard = async (id, t, c) => {
    const cardDoc = doc(db, "testCollection", id);
    try {
      await updateDoc(cardDoc, { title: t });
      getCardList();
    } catch (err) {
      console.error(err);
    }
    try {
      await updateDoc(cardDoc, { content: c });
      getCardList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen flex float-right">
      <Navbar></Navbar>
      <div className=" pt-16 flex flex-row flex-wrap">
        {/* <Auth></Auth> */}
        <CreateCardButton submitFunction={submitCard}></CreateCardButton>
        {cardList.map((card) => {
          return (
            <Card
              key={card.id}
              topic={card.title}
              content={card.content}
              deleteFunction={() => {
                deleteCard(card.id);
              }}
              updateFunction={() => {
                updateCard(card.id, updatedTopic, updatedContent);
              }}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}
