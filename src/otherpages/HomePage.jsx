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
import { useAuth } from "../contexts/AuthContext.js";
import Modal from "../components/Modal.jsx";

export function HomePage() {
  const [cardList, setCardList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const temp = useAuth();
  const cardsCollectionsRef = getCollection();
  function getCollection() {
    try {
      const col = collection(db, temp.currentUser.email + "");
      return col;
    } catch (err) {
      console.error(err);
    }
  }
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
      const cardDoc = doc(db, temp.currentUser.email, id);
      await deleteDoc(cardDoc);
      getCardList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCard = async (id, t, c) => {
    setToggle(!toggle);
    // const cardDoc = doc(db, temp.currentUser.email, id);
    // try {
    //   await updateDoc(cardDoc, { title: t });
    //   getCardList();
    // } catch (err) {
    //   console.error(err);
    // }
    // try {
    //   await updateDoc(cardDoc, { content: c });
    //   getCardList();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="w-screen h-fit p-0">
      <Navbar></Navbar>
      <div className="pt-16 px-0 flex flex-row flex-wrap portrait:w-min portrait:m-auto">
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
      <Modal toggle={toggle}></Modal>
    </div>
  );
}
