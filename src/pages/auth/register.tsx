import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

import "./register.css";
import { useRegister } from "../../features/auth/hooks/useRegister";
import { registerSchema, type RegisterForm } from "../../features/auth/validation/register.schema";

function Register() {
  const { register, handleSubmit, setError, formState: { errors } } =
    useForm<RegisterForm>({
      resolver: zodResolver(registerSchema),
    });

  const { mutate, isPending } = useRegister((fieldErrors) => {
    Object.entries(fieldErrors).forEach(([key, message]) => {
      setError(key as keyof RegisterForm, { message });
    });
  });

  const onSubmit = (data: RegisterForm) => {
    mutate({
      userName: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="login-dark">
      <div className="auth-card">
        {/* Main form box */}
        <div className="auth-box">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="illustration">
              <i className="bi bi-person-plus-fill"></i>
            </div>

            <div className="d-flex gap-2">
              <Form.Group className="mb-3 flex-fill">
                <Form.Control
                  placeholder="First name"
                  isInvalid={!!errors.firstName}
                  {...register("firstName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 flex-fill">
                <Form.Control
                  placeholder="Last name"
                  isInvalid={!!errors.lastName}
                  {...register("lastName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                isInvalid={!!errors.email}
                {...register("email")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                isInvalid={!!errors.password}
                {...register("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              disabled={isPending}
              className="btn btn-primary w-100"
            >
              {isPending ? <Spinner size="sm" /> : "Register"}
            </Button>

            <Link to="/login" className="forgot">
              Already have an account? Sign in
            </Link>
          </Form>
        </div>

        {/* OR separator (same as before) */}
        <div className="separator">
          <div className="line" />
          <div className="or">OR</div>
          <div className="line" />
        </div>

        {/* Social login box (restored) */}
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
