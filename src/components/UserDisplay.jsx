import React from "react";
import { useAuth } from "../contexts/AuthContext";

export function UserDisplay() {
  const temp = useAuth();
  return (
    <div className="min-w-96 w-4/12 h-4/12 bg-gray-600 rounded-lg mx-auto">
      <h2 className="text-white text-2xl m-8">{temp.currentUser.email}</h2>
    </div>
  );
}
