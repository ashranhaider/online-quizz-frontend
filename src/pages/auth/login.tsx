import { Form, Button } from "react-bootstrap";
import "./login.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { useLogin } from "../../features/auth/hooks/useLogin";
import { useState, type FormEvent } from "react";
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useGoogleLogin } from "../../features/auth/hooks/useGoogleLogin";
import { toastService } from "../../shared/services/toast.service";

function Login() {
  const { mutate, isPending } = useLogin();
  const { mutate: mutateGoogle, isPending: isGooglePending } = useGoogleLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };
  
  function handlegoogleLoginSucces(response: CredentialResponse) {
    const googleToken = response.credential;
    mutateGoogle({ IdToken: googleToken ?? "" });
  }

  return (
    <div className="login-dark">
      <div className="auth-card">
        <div className="auth-box">
          <Form onSubmit={handleSubmit}>
            <div className="illustration">
              <i className="bi bi-lock-fill"></i>
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

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="form-control"
              />
            </Form.Group>

            <Button type="submit" disabled={isPending} className="btn btn-primary w-100">
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <Link to="/forgot-password" className="forgot">
              Forgot your email or password?
            </Link>

            <Link to="/register" className="forgot" style={{ marginTop: 8, display: 'block' }}>
              Don't have an account? Register
            </Link>
          </Form>
        </div>

        <div className="separator">
          <div className="line" />
          <div className="or">OR</div>
          <div className="line" />
        </div>

        <div className="auth-box social-box">
          <div className="social-title">Sign in with</div>
          {
            !isGooglePending &&
            <div className="small text-muted">
              <GoogleLogin
                onSuccess={handlegoogleLoginSucces}
                onError={() => {
                  toastService.error("Google login failed")
                }}
              />
            </div>
          }

          
          {/* <Button className="btn-social" type="button">
            <i className="bi bi-facebook" />
            <span>Continue with Facebook</span>
          </Button> */}
        </div>
      </div>
    </div>
  );

}
export default Login;
