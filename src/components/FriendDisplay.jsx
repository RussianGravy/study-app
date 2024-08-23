import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, collection } from "firebase/firestore";

export function FriendDisplay() {
  const [users, setUsers] = useState([]);
  const temp = useAuth();

  async function getUsers() {
    var users = [];
    try {
      var ref = doc(db, "/global_data", "users");
      var obj = (await getDoc(ref)).data();
      for (const userPair of Object.entries(obj)) {
        await addToList(userPair, users);
      }
      setUsers(users);
    } catch (err) {
      console.error(err);
    }
  }

  async function addToList(userPair, tempUsers) {
    var docRef = doc(db, userPair[1], "username");
    var username = (await getDoc(docRef)).data().username;
    tempUsers.push(username);
    console.log("all friends " + tempUsers);
    console.log("possible friend: " + username);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full h-fit flex flex-col mt-10 p-10">
      <h1 className="text-white text-5xl mt-10">Friends</h1>
      {users.length > 0 ? (
        <div className="h-fit rounded-lg bg-gray-600 text-gray-300  mt-8 text-4xl text-center">
          {users.map((user) => {
            return userIcon(user);
          })}
        </div>
      ) : (
        <h2 className="h-fit rounded-lg bg-gray-600 text-gray-300  mt-8 text-4xl text-center">
          No users to friend.
        </h2>
      )}
    </div>
  );
}

function userIcon({ username }) {
  return (
    <div className="w-40 h-40 rounded-full bg-blue-500 m-4 flex">
      <h1 className="text-white m-auto">{username}</h1>
    </div>
  );
}
