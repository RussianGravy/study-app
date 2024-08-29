import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Card } from "../components/Card.jsx";
import {
  EditMenu,
  DeleteMenu,
  NewCardMenu,
} from "../components/DeckMenuModals.jsx";
import {
  CreateCardButton,
  newContent,
  newTopic,
} from "../components/CreateCardButton.jsx";
import { auth, googleProvider, db } from "../config/firebase.js";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext.js";
import { Modal } from "../components/Modal.jsx";
import { useDeck } from "../contexts/DeckContext.js";
import styles from "../components/custom_css/global.module.css";

export function DeckPage() {
  const [cardList, setCardList] = useState([]);
  const [containerWidth, setContainerWidth] = useState(
    window.innerWidth - (window.innerWidth % 360) + "px"
  ); // width for cards div
  const [toggle, setToggle] = useState(false); //modal toggle
  const [modalContent, setModalContent] = useState(<></>);
  const [defaultValues, setDefaultValues] = useState({
    topic: null,
    content: null,
  }); //values for updateCard modal
  const temp = useAuth();
  const deckValues = useDeck();
  const navigate = useNavigate();
  var collectionPath =
    temp.currentUser.email + "/decks/" + deckValues.currentDeck;
  const cardsCollectionsRef = getCollection();

  useEffect(() => {
    document.body.className = styles.homeBody;
    return () => {
      document.body.className = "";
    };
  }, []); // homepage body styling

  useEffect(() => {
    if (deckValues.currentDeck === "") navigate("/");
    else {
      collectionPath =
        temp.currentUser.email + "/decks/" + deckValues.currentDeck;
      getCardList();
    }
  }, []); // check for currentDeck, redirect if none

  function getCollection() {
    try {
      const col = collection(db, collectionPath);
      return col;
    } catch (err) {
      console.error(err);
    }
  }

  const getCardList = async () => {
    // Read the data
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
    // Set card list
  };

  useEffect(() => {
    getCardList();
  }, [toggle]);

  const submitCard = async () => {
    setModalContent(
      <NewCardMenu
        closeFunction={() => {
          setToggle(false);
        }}
        createFunction={(topic, content) => {
          setDoc(doc(db, collectionPath, "/" + cardList.length), {
            title: topic,
            content: content,
            userId: auth?.currentUser?.uid,
          });
          setToggle(false);
        }}
      />
    );
    await setToggle(true);
  };

  const deleteCard = async (id) => {
    setModalContent(
      <DeleteMenu
        deleteFunction={() => {
          const cardDoc = doc(db, collectionPath, id);
          deleteDoc(cardDoc);
          try {
            getCardList();
          } catch (err) {
            console.error(err);
          } finally {
            setToggle(false);
          }
        }}
        closeFunction={() => {
          setToggle(false);
        }}
      />
    );
    await setToggle(true);
  };

  const updateCard = async (id) => {
    const ref = doc(db, collectionPath + "/" + id);
    const card = (await getDoc(ref)).data();
    setModalContent(
      <EditMenu
        defaultTopic={card.title}
        defaultContent={card.content}
        updateFunction={async (topic, content) => {
          const cardDoc = doc(db, collectionPath, id);
          updateDoc(cardDoc, { title: topic, content: content });
          setToggle(false);
        }}
        closeFunction={() => {
          setToggle(false);
        }}
      />
    );
    setToggle(true);
  };

  window.addEventListener("resize", () => {
    setContainerWidth(window.innerWidth - (window.innerWidth % 360) + "px");
  });

  return (
    <div className="w-screen min-h-screen p-0 m-0 relative bg-slate-500 flex flex-col">
      <Navbar></Navbar>
      <CreateCardButton submitFunction={submitCard}></CreateCardButton>
      <div className="pt-20 w-11/12 flex flex-nowrap mx-auto">
        <h1 className="text-white text-5xl grow">{deckValues.currentDeck}</h1>
        <button className="w-10 aspect-square bg-slate-700 rounded-xl self-center"></button>
      </div>
      <div
        className="pb-28 px-0 flex flex-row flex-wrap mx-auto"
        style={{ width: containerWidth }}
      >
        {cardList.length == 0 ? (
          <h1 className="text-gray-200 text-3xl text-center m-auto mt-20 leading-relaxed">
            No cards to display! Press the 'plus' in the bottom right to add
            your first card.
          </h1>
        ) : (
          cardList.map((card) => {
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
          })
        )}
      </div>
      <Modal toggle={toggle}>{modalContent}</Modal>
    </div>
  );
}
