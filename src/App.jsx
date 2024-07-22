import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { LoginPage } from "./otherpages/LoginPage.jsx";
import { HomePage } from "./otherpages/HomePage.jsx";
import { auth, googleProvider, db } from "./config/firebase.js";
//temp
import { SignUp } from "./src/components/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        {/* <Route index element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
