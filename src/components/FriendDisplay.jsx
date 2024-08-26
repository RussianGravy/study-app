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
    <div className="w-full h-fit flex flex-col p-7">
      <h1 className="text-white text-5xl ">Friends</h1>
      {users.length > 0 ? (
        <div className="w-full h-fit rounded-lg bg-gray-600 text-gray-300  mt-8 text-4xl text-center flex flex-row  overflow-x-scroll">
          {users.map((user) => {
            return <UserIcon username={user} key={user} />;
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

function UserIcon({ username }) {
  return (
    <div className="w-max h-fit py-5 px-3">
      <div className="w-40 h-40 rounded-full outline outline-gray-400 bg-blue-500 mt-4 mx-auto flex">
        <h2 className="m-auto text-6xl">{username.slice(0, 1)}</h2>
      </div>
      <h2 className="text-white mt-3 mx-auto text-xl">{username}</h2>
    </div>
  );
}
