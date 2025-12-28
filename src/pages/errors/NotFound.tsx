import { Link } from "react-router-dom";
import "./errors.css";

function NotFound() {
  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-code">404</div>
        <div className="error-title">Page Not Found</div>
        <div className="error-desc">The page you are looking for doesn't exist or has been moved.</div>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
