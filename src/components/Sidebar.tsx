
import { NavLink } from "react-router";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="#">
          <span className="align-middle">Online Quiz</span>
        </a>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          {/* <li className="sidebar-item">
            <NavLink className="sidebar-link" to="/">
              <i className="align-middle" data-feather="sliders" />{" "}
              <span className="align-middle">Dashboard</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink className="sidebar-link" to="/profile">
              <i className="align-middle" data-feather="user" />{" "}
              <span className="align-middle">Profile</span>
            </NavLink>
          </li> */}

          <li className="sidebar-item active">
            <NavLink className="sidebar-link" to="/admin/home">
              <i className="align-middle" data-feather="book" />{" "}
              <span className="align-middle">Blank</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
