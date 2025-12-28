import { useNavigate } from "react-router-dom";
import "./errors.css";

function ServerError() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-code">500</div>
        <div className="error-title">Server Error</div>
        <div className="error-desc">Something went wrong on our end. Please try again later.</div>
        <div className="error-actions">
          <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServerError;
