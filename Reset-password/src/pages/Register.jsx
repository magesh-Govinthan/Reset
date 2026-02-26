import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <Container className="d-flex  vh-100 justify-content-center align-items-center" fluid='md'>
      <Card style={{ width: "600px" }} className="p-4 shadow">
        <h4 className="text-center mb-3">Register</h4>
        {message && <Alert>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100">Register</Button>
        </Form>
        <div className="mt-3 text-center">
          <a href="/login">Already have an account? Login</a>
        </div>
      </Card>
    </Container>
  );
}