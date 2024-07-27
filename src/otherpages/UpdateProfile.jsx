import { React, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef(" ");
  const passwordRef = useRef(" ");
  const passwordConfrimRef = useRef(" ");
  const temp = useAuth();
  console.log(temp);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfrimRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== temp.currentUser.email) {
      promises.push(temp.updateemail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(temp.updatepassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update profile.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Update Profile</h2>
          {/* {temp.currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={temp.currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfrimRef}
                placeholder="leave blank to keep the same"
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              Update
            </Button>
            <div className="w-100 text-center mt-2">
              <Link className="text-blue-700" to="/login">
                {" "}
                Cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
