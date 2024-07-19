import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Card } from "../components/Card.jsx";
import { CreateCardButton } from "../components/CreateCardButton.jsx";
import { auth, googleProvider, db } from "../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";

export function HomePage() {
  const [cardList, setCardList] = useState([]);
  const cardsCollectionsRef = collection(db, "testCollection");
  useEffect(() => {
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
    getCardList();
  }, []);

  //checkForSignIn();

  return (
    <div className="w-screen h-screen flex float-right">
      <Navbar></Navbar>
      <div className=" pt-16 flex flex-row flex-wrap">
        {cardList.map((card) => {
          console.log(card.title);
          return (
            <Card
              key={card.id}
              topic={card.title}
              content={card.content}
            ></Card>
          );
        })}
        <CreateCardButton></CreateCardButton>
      </div>
    </div>
  );
}

const checkForSignIn = () => {
  console.log(auth.currentUser);
  if (auth.currentUser != undefined) {
    console.log("signed in");
    window.location.href = "/homepage";
  } else {
    console.log("you need to sign in");
    window.location.href = "/";
  }
};
