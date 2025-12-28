import { Link } from "react-router-dom";
import "./errors.css";

function ServerError() {
  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-code">500</div>
        <div className="error-title">Server Error</div>
        <div className="error-desc">Something went wrong on our end. Please try again later.</div>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">Reload Home</Link>
        </div>
      </div>
    </div>
  );
}

export default ServerError;
