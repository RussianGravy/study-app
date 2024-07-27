import { React, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassowrd() {
  const emailRef = useRef(" ");
  const passwordRef = useRef(" ");
  const passwordConfrimRef = useRef(" ");
  const temp = useAuth();
  console.log(temp);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await temp.resetpassword(emailRef.current.value);
      //   navigate("/login");
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to reset password.");
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Reset
            </Button>
            <div className="w-100 text-center mt-2">
              <Link className="text-blue-700" to="/login">
                {" "}
                Log In
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account?
        <Link className="text-blue-700" to="/signup">
          {" "}
          Sign Up
        </Link>
      </div>
    </>
  );
}
