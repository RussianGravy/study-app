import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const [error, setError] = useState("");
  const temp = useAuth();
  const navigate = useNavigate();
  async function handleLogOut() {
    setError("");
    try {
      await temp.logOut();
      navigate("/login");
    } catch (err) {
      setError("Failed to log out.");
      console.error(err);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {temp.currentUser?.email}
          <Link
            to="/update-profile"
            className="btn btn-primary mt-3"
            style={{ width: "100%" }}
          >
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
}
