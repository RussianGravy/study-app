import { React, useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { setDoc, getDoc, doc, collection, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(user_name, email, password) {
    try {
      //sign up user
      await createUserWithEmailAndPassword(auth, email, password);
      //store username
      var ref = await doc(db, email, "username");
      setDoc(ref, { username: user_name });
      //store user globally
      var docRef = await doc(db, "global_data", "users");
      updateDoc(docRef, { [user_name]: email });
    } catch (err) {
      // console.error(err);
      throw err;
    }
    return "mad it"; //test
  }

  function logOut() {
    return signOut(auth);
  }

  function resetpassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateemail(email) {
    return updateEmail(currentUser, email);
  }

  function updatepassword(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signUp,
    logIn,
    logOut,
    resetpassword,
    updateemail,
    updatepassword,
    currentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
