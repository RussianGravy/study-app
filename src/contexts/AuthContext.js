import { React, useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
