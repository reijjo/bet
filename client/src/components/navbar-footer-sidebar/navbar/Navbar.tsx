import "../../common/button/Button.css";
import "./Navbar.css";

import { NavLink } from "react-router-dom";

import logo from "../../../assets/fishing.png";

export const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <div className="nav-links-common">
          <div className="nav-logo-visible">
            <NavLink to="/" className="btn-font underline-hover">
              <img src={logo} alt="logo" height={32} width={32} />
              <p>tärpit</p>
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
