import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const NavBar = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const renderAuthButton = () => {
    if (token) {
      return <Logout />;
    } else {
      if (location.pathname === "/register") {
        return null; // Hide register button when on the register page
      } else {
        return (
          <Link className="nav-link" to="/register">
            Register
          </Link>
        );
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TodoApp
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {renderAuthButton()}
            {token || location.pathname === "/register" ? null : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
