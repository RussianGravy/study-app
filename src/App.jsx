import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { LoginPage } from "./otherpages/LoginPage.jsx";
import { HomePage } from "./otherpages/HomePage.jsx";
import { DeckPage } from "./otherpages/DeckPage.jsx";
import { SignUpPage } from "./otherpages/SignUpPage.jsx";
import { ProfilePage } from "./otherpages/ProfilePage.jsx";
import { LandingPage } from "./otherpages/LandingPage.jsx";
import { auth, googleProvider, db } from "./config/firebase.js";
//temp
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { DeckProvider } from "./contexts/DeckContext.js";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-height-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <DeckProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={<PrivateRoute Component={HomePage} />}
                />
                <Route
                  exact
                  path="/deck"
                  element={<PrivateRoute Component={DeckPage} />}
                />
                <Route
                  exact
                  path="/profile"
                  element={<PrivateRoute Component={ProfilePage} />}
                />
                <Route path="/landing" Component={LandingPage} />
                <Route path="/signup" Component={SignUpPage} />
                <Route path="/login" Component={LoginPage} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </DeckProvider>
      </div>
    </Container>
  );
}

export default App;
