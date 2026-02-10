import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useRegister } from "../../features/auth/hooks/useRegister";
import RegisterForm from "../../features/auth/components/RegisterForm";
import type { RegisterRequest } from "../../features/auth/types/register";
import { toastService } from "../../shared/services/toast.service";
import { getApiErrorMessage } from "../../shared/utils/getApiErrorMessage";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useGoogleLogin } from "../../features/auth/hooks/useGoogleLogin";
export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
    const { mutate: mutateGoogle, isPending: isGooglePending } = useGoogleLogin();

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
function handleGoogleLoginSuccess(response: CredentialResponse) {
    const googleToken = response.credential;
    if (!googleToken) {
      toastService.error("Google login failed");
      return;
    }
    mutateGoogle({ IdToken: googleToken });
  }
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

           {!isGooglePending && <GoogleLogin
            text="signup_with"
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              toastService.error("Google login failed")
            }}
          />}

          {/* <button className="btn-social">
            <i className="bi bi-facebook" />
            Continue with Facebook
          </button> */}
        </div>

      </div>
    </div>

  );
}
