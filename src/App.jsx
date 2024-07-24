import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { LoginPage } from "./otherpages/LoginPage.jsx";
import { HomePage } from "./otherpages/HomePage.jsx";
import { auth, googleProvider, db } from "./config/firebase.js";
//temp
import { SignUp } from "./components/SignUp.jsx";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-height-center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <SignUp></SignUp>
        </div>
      </Container>
    </AuthProvider>

    // <BrowserRouter>
    //   <Routes>
    //     <Route index element={<LoginPage />} />
    //     <Route path="/homepage" element={<HomePage />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
