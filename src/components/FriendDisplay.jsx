import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, collection } from "firebase/firestore";
import user_icon from "../assets/user_icon.png";

export function FriendDisplay() {
  const [users, setUsers] = useState([]);
  const temp = useAuth();

  async function getUsers() {
    var users = [];
    try {
      var ref = doc(db, "/global_data", "users");
      var obj = (await getDoc(ref)).data();
      for (const userPair of Object.entries(obj)) {
        if (userPair[1] != temp.currentUser.email)
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
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-11/12 h-fit flex flex-col py-7 z-20 m-auto">
      <h1 className="text-black text-5xl ">Other Users</h1>
      {users.length > 0 ? (
        <div>
          <div className="w-full h-fit rounded-lg bg-gray-50 bg-opacity-50 text-gray-300  mt-8 text-4xl text-center flex flex-row  overflow-x-hidden">
            {users.map((user) => {
              return <UserIcon username={user} key={user} />;
            })}
          </div>
        </div>
      ) : (
        <h2 className="h-fit rounded-lg bg-gray-50 bg-opacity-50 text-gray-600  mt-8 text-4xl text-center">
          Error getting users to friend...
        </h2>
      )}
    </div>
  );
}

function UserIcon({ username }) {
  const navigate = useNavigate();
  return (
    <div className="w-max h-fit py-5 px-3">
      <button
        className="w-40 h-40 rounded-full outline outline-gray-700 bg-blue-200 mt-4 mx-auto flex overflow-hidden"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <img src={user_icon} className="w-full aspect-square mt-5" />
      </button>
      <h2 className="text-black mt-3 mx-auto text-xl">{username}</h2>
    </div>
  );
}
