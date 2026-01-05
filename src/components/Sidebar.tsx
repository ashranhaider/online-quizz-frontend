
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="#">
          <span className="align-middle">Online Quiz</span>
        </a>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <li className={`sidebar-item ${isActive("/admin/home") ? "active" : ""}`}>
            <NavLink className="sidebar-link" to="/admin/home">
              <i className="align-middle" data-feather="home" />{" "}
              <span className="align-middle">Home</span>
            </NavLink>
          </li>
          <li className={`sidebar-item ${isActive("/admin/quiz") ? "active" : ""}`}>
            <NavLink className="sidebar-link" to="/admin/quiz">
              <i className="align-middle" data-feather="monitor" />{" "}
              <span className="align-middle">Quiz</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
