import { Form, Button, Spinner } from "react-bootstrap";
import "./register.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useRegister } from "../../features/auth/hooks/useRegister";
import type { RegisterRequest } from "../../features/auth/types/register";

function Register() {
  const { mutate, isPending } = useRegister();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const registerRequest: RegisterRequest = {
      userName: email,
      firstName,
      lastName,
      email,
      password
    };

    mutate(registerRequest);
  };

  return (
    <div className="login-dark">
      <div className="auth-card">
        <div className="auth-box">
          <Form onSubmit={handleSubmit}>
            <div className="illustration">
              <i className="bi bi-person-plus-fill"></i>
            </div>

            <div className="d-flex gap-2">
              <Form.Group className="mb-3 flex-fill">
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="form-control"
                />
              </Form.Group>

              <Form.Group className="mb-3 flex-fill">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>

            <Button type="submit" disabled={isPending} className="btn btn-primary w-100">
              {isPending ? <Spinner size="sm" /> : "Register"}
            </Button>

            <Link to="/login" className="forgot">
              Already have an account? Sign in
            </Link>
          </Form>
        </div>

        <div className="separator">
          <div className="line" />
          <div className="or">OR</div>
          <div className="line" />
        </div>

        <div className="auth-box social-box">
          <div className="social-title">Sign up with</div>
          <Button className="btn-social" type="button">
            <i className="bi bi-google" />
            <span>Continue with Google</span>
          </Button>

          <Button className="btn-social" type="button">
            <i className="bi bi-facebook" />
            <span>Continue with Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
