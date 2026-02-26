import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService.js";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      setMessage(res.message);
      setTimeout(() => navigate("/login"), 2000); // redirect after success
    } catch (err) {
      setMessage(err.response?.data?.message || "Token invalid or expired");
    }
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Card style={{ width: "600px" }} className="p-4 shadow">
        <h4 className="text-center mb-3">Reset Password</h4>
        {message && <Alert>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Reset Password
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <a href="/login">Back to Login</a>
        </div>
      </Card>
    </Container>
  );
}