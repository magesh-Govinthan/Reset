import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { forgotPassword } from "../services/authService.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Card style={{ width: "600px" }} className="p-4 shadow">
        <h4 className="text-center mb-3">Forgot Password</h4>
        {message && <Alert>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Send Reset Link
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <a href="/login">Back to Login</a>
        </div>
      </Card>
    </Container>
  );
}