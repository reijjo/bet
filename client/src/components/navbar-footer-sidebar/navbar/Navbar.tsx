import "../../common/button/Button.css";
import "./Navbar.css";

import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <div className="nav-links">
          <div className="nav-logo">
            <NavLink to="/" className="btn-font underline-hover">
              tärpit
            </NavLink>
          </div>
          <div className="nav-login">
            <NavLink to="/login" className="btn-font underline-hover">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
