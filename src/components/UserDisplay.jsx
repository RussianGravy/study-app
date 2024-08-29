import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

export function UserDisplay() {
  //   const [username, setUsername] = useState(getUsername());
  const temp = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername();
  }, []);

  async function getUsername() {
    try {
      const ref = doc(db, temp.currentUser.email, "username");
      setUsername((await getDoc(ref)).data().username);
    } catch (err) {
      console.error(err);
      setUsername("error getting name...");
    }
  }

  return (
    <div className="min-w-96 w-4/12 h-4/12 bg-gray-600 rounded-lg mx-auto portrait:mb-7  flex flex-col">
      <div className="w-fit flex flex-row items-center m-5">
        <div className="h-full aspect-square rounded-full outline outline-gray-800 bg-blue-600"></div>
        <h2 className="text-white text-4xl text-nowrap w-fit ml-3">
          {username}
        </h2>
      </div>
    </div>
  );
}
