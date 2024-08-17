import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { LoginPage } from "./otherpages/LoginPage.jsx";
import { HomePage } from "./otherpages/HomePage.jsx";
import { SignUpPage } from "./otherpages/SignUpPage.jsx";
import TestPage from "./otherpages/TestPage.jsx";
import { auth, googleProvider, db } from "./config/firebase.js";
//temp
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import ForgotPassword from "./otherpages/ForgotPassword.jsx";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-height-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <RouteChangeHandler />
              <Route
                exact
                path="/"
                element={<PrivateRoute Component={HomePage} />}
              />
              <Route path="/signup" Component={SignUpPage} />
              <Route path="/login" Component={LoginPage} />
              <Route path="/forgot-password" Component={ForgotPassword} />
              <Route path="/test" Component={TestPage} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

const RouteChangeHandler = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/") {
      // Light gray for login
      document.body.classList.add("bg-slate-500");
    } else {
      document.body.style.backgroundColor = "white"; // White for home
    }
  }, [location.pathname]);

  return null;
};

export default App;
