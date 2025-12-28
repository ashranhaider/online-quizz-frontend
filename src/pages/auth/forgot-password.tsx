import { Form, Button } from "react-bootstrap";
import "./login.css";
import "./forgot-password.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: call password reset API
    alert("If this email exists, a reset link will be sent.");
  };

  return (
    <div className="login-dark single-auth">
      <div className="auth-card">
        <div className="auth-box">
          <Form onSubmit={handleSubmit}>
            <div className="illustration">
              <i className="bi bi-envelope-fill"></i>
            </div>

            <div className="mb-3" style={{ textAlign: 'center', color: '#cbd5e1' }}>
              Enter your account email and we'll send a password reset link.
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="form-control"
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100">
              Send reset link
            </Button>

            <Link to="/login" className="forgot">
              Back to sign in
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
