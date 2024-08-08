import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Card } from "../components/Card.jsx";
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
  const [toggle, setToggle] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const modalVariables = { id: null };
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
      await getCardList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCard = async (id) => {
    setModalContent(DeleteMenu);
    console.log("delete button pressed, toggle set to " + toggle);
    await setToggle(true);
    modalVariables.id = id;
    // try {
    //   const cardDoc = doc(db, temp.currentUser.email, id);
    //   await deleteDoc(cardDoc);
    //   getCardList();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const updateCard = async (id) => {
    setModalContent(EditMenu);
    await setToggle(true);
    console.log("update button pressed, toggle set to " + toggle);
    modalVariables.id = id;
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

  const DeleteMenu = (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-fit p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">Deleting Card</p>
        <button
          onClick={async () => {
            await setToggle(false);
            console.log("toggled modal to " + toggle);
            modalVariables.id = null;
            modalVariables.topic = null;
            modalVariables.content = null;
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Cancel
        </button>
      </div>
      <div className="w-fit mx-auto my-8 text-xl">
        Are you Sure?{" "}
        <button
          className="text-blue-600"
          onClick={async () => {
            const cardDoc = doc(db, temp.currentUser.email, modalVariables.id);
            console.log(cardDoc);
            deleteDoc(cardDoc);
            await getCardList();
            setToggle(false);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );

  var updatedTopic;
  var updatedContent;
  const EditMenu = (
    <div className="bg-slate-300 flex flex-col mx-5 my-14 w-80 h-fit p-3 rounded-lg border-2 border-black relative overflow-hidden">
      <div className="text-5xl h-7 w-full self-center flex z-30">
        <p className="grow text-2xl">Updating Card</p>
        <button
          onClick={async () => {
            await setToggle(false);
            console.log("toggled modal to " + toggle);
            modalVariables.id = null;
            modalVariables.topic = null;
            modalVariables.content = null;
          }}
          className="text-white text-xl w-fit px-1 rounded bg-red-600"
        >
          Cancel
        </button>
      </div>
      <div className="mt-8 flex flex-wrap w-full">
        <h1>Topic</h1>
        <input
          type="text"
          placeholder="topic"
          className="w-fit mb-4 text-3xl rounded-xl"
          onChange={(e) => {
            updatedTopic = e.target.value;
          }}
        />
        <h1>Content</h1>
        <input
          type="text"
          placeholder="content"
          className="w-fit mb-4 text-3xl rounded-xl"
          onChange={(e) => {
            updatedContent = e.target.value;
          }}
        />
      </div>
      <button
        onClick={async () => {
          const cardDoc = doc(db, temp.currentUser.email, modalVariables.id);
          updateDoc(cardDoc, { title: updatedTopic, content: updatedContent });
          modalVariables.id = null;
          modalVariables.topic = null;
          modalVariables.content = null;
          await getCardList();
          setToggle(false);
        }}
        className="bg-blue-600 text-white mx-auto py-1 px-7"
      >
        Update
      </button>
    </div>
  );

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
                updateCard(card.id);
              }}
            ></Card>
          );
        })}
      </div>
      <Modal toggle={toggle}>{modalContent}</Modal>
    </div>
  );
}
