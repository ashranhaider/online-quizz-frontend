import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useRegister } from "../../features/auth/hooks/useRegister";
import RegisterForm from "../../features/auth/components/RegisterForm";
import type { RegisterRequest } from "../../features/auth/types/register";
import { toastService } from "../../shared/services/toast.service";
import { getApiErrorMessage } from "../../shared/utils/getApiErrorMessage";
export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();

  const submit = async (data: RegisterRequest) => {
   try {
      const response = await mutateAsync(data);

      if (!response.data) {
        toastService.error("Registration failed.");
        return;
      }

      toastService.success(
        response.data.message ?? "Registration successful!"
      );

      navigate("/login", { replace: true });
    } catch (error: any) {
      
      const errorMessage = getApiErrorMessage(error);
      toastService.error(errorMessage);
    }
  };

  return (
    <div className="login-dark">
      <div className="auth-card">

        <div className="auth-box">
          <div className="illustration">
            <i className="bi bi-person-plus-fill"></i>
          </div>

          <RegisterForm
            onSubmit={submit}
            isSubmitting={isPending}
          />

          <Link to="/login" className="forgot">
            Already have an account? Sign in
          </Link>
        </div>

        <div className="separator">
          <div className="line" />
          <div className="or">OR</div>
          <div className="line" />
        </div>

        <div className="auth-box social-box">
          <div className="social-title">Sign up with</div>

          <button className="btn-social">
            <i className="bi bi-google" />
            Continue with Google
          </button>

          <button className="btn-social">
            <i className="bi bi-facebook" />
            Continue with Facebook
          </button>
        </div>

      </div>
    </div>

  );
}
