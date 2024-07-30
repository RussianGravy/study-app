import { React, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

export function SignUp() {
  const emailRef = useRef(" ");
  const passwordRef = useRef(" ");
  const passwordConfrimRef = useRef(" ");
  const temp = useAuth();
  console.log(temp);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfrimRef.current.value) {
      console.log(
        passwordRef.current.value + ", " + passwordConfrimRef.current.value
      );
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await temp.signUp(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError("Failed to create an account.");
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Sign Up</h2>
          {/* {temp.currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfrimRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link className="text-blue-700" to="/login">
          {" "}
          Log In
        </Link>
      </div>
    </>
  );
}