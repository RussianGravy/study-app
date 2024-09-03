import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Navbar } from "../components/Navbar";
import styles from "../components/custom_css/global.module.css";

export function ProfilePage(userEmail) {
  const [username, setUsername] = useState();

  async function getUsername() {
    try {
      const ref = doc(db, userEmail, "username");
      setUsername((await getDoc(ref)).data().username);
    } catch (err) {
      console.error(err);
      setUsername("error getting name...");
    }
  }

  useEffect(() => {
    getUsername();
  }, []); // getting initial values

  useEffect(() => {
    document.body.className = styles.homeBody;
    return () => {
      document.body.className = "";
    };
  }, []); // body styling for this page

  return (
    <div className="w-screen h-screen flex">
      <Navbar currentPage={"Profile"} />{" "}
      <div className="m-auto">{username}</div>
    </div>
  );
}
