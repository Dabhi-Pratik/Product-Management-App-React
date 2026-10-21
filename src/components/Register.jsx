import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      navigate("/products", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "480px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h2 className="mb-4 text-center">Create Account</h2>

          {error && <p className="text-danger">{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
