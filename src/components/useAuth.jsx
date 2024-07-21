import { useState } from "react";
import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return unsubscribe;
  }, []);
  return user;
};

// useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//       setUser(user);
//     });

//     // Clean-up subscription to avoid memory leaks
//     return () => unsubscribe();
//   }, []);
