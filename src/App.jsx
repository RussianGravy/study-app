import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { LoginPage } from "./otherpages/LoginPage.jsx";
import { HomePage } from "./otherpages/HomePage.jsx";
import { auth, googleProvider, db } from "./config/firebase.js";

function App() {
  //   const loadPage = async () => {
  //     if (auth?.currentUser?.email != undefined) return <HomePage></HomePage>;
  //     else return <LoginPage></LoginPage>;
  //   };
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    // <>{loadPage}</>
  );
}

export default App;
