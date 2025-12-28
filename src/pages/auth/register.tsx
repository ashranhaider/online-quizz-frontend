import { Form, Button } from "react-bootstrap";
import "./register.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login-dark">
      <div className="auth-card">
        <div className="auth-box">
          <Form>
            <div className="illustration">
              <i className="bi bi-person-plus-fill"></i>
            </div>

            <div className="d-flex gap-2">
              <Form.Group className="mb-3 flex-fill">
                <Form.Control type="text" placeholder="First name" className="form-control" />
              </Form.Group>

              <Form.Group className="mb-3 flex-fill">
                <Form.Control type="text" placeholder="Last name" className="form-control" />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" className="form-control" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" className="form-control" />
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100">
              Register
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
