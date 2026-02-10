import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();

  const displayName = (() => {
    const u = user?.user;
    if (!u) return "User";
    const full = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
    return full || u.userName || u.email || "User";
  })();

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-icon dropdown-toggle d-inline-block d-sm-none"
        href="#"
        data-bs-toggle="dropdown"
      >
        <i className="align-middle" data-feather="settings" />
      </a>

      <a
        className="nav-link dropdown-toggle d-none d-sm-inline-block"
        href="#"
        data-bs-toggle="dropdown"
      >
        <i className="align-middle avatar-icon me-1" data-feather="user" />
        <span className="text-dark">{displayName}</span>
      </a>

      <div className="dropdown-menu dropdown-menu-end">
        <Link className="dropdown-item" to="/profile">
          <i className="align-middle me-1" data-feather="user" /> Profile
        </Link>
        <div className="dropdown-divider" />
        <Link className="dropdown-item" to="/settings">
          <i className="align-middle me-1" data-feather="settings" /> Settings &amp; Privacy
        </Link>
        <div className="dropdown-divider" />
        <button type="button" className="dropdown-item d-flex align-items-center" onClick={logout}>
          <i className="align-middle me-1" data-feather="log-out" />
          <span>Log out</span>
        </button>
      </div>
    </li>
  );
};

export default UserMenu;
