import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; //not talked about in video
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAG1m3hv3BEl0JCS9J98uQWE4lRtktu3xA",
  authDomain: "flashcards-12619.firebaseapp.com",
  projectId: "flashcards-12619",
  storageBucket: "flashcards-12619.appspot.com",
  messagingSenderId: "876096607819",
  appId: "1:876096607819:web:101dfbe94c8415c56a5fce",
  measurementId: "G-WGGHJQ91DZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); //not talked about in video
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);