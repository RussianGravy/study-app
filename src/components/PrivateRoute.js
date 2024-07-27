import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

export function PrivateRoute({ Component, ...ref }) {
  const temp = useAuth();
  return temp.currentUser ? <Component {...ref} /> : <Navigate to="/login" />;
}
