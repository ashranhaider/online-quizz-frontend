import { Form, Button } from "react-bootstrap";
import "./login.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Login() {
  return (
    <div className="login-dark">
      <div className="auth-card">
        <div className="auth-box">
          <Form>
            <div className="illustration">
              <i className="bi bi-lock-fill"></i>
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100">
              Log In
            </Button>

            <a href="#" className="forgot">
              Forgot your email or password?
            </a>
          </Form>
        </div>

        <div className="separator">
          <div className="line" />
          <div className="or">OR</div>
          <div className="line" />
        </div>

        <div className="auth-box social-box">
          <div className="social-title">Sign in with</div>
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

export default Login;
