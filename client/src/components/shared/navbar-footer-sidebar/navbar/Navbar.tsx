import "../../../ui/v2/button/Button2.css";
import "./Navbar.css";

import { NavLink } from "react-router-dom";

import logo from "../../../../assets/fishing.png";
import { useScreenWidth } from "../../../../hooks/useScreenWidth";

export const Navbar = () => {
  const { isMobile } = useScreenWidth();

  return (
    <nav>
      <div className={`wrapper ${isMobile && "nav-wrapper"}`}>
        <div className="nav-links-common">
          <div className={`nav-logo-visible ${!isMobile && "nav-wrapper"} `}>
            <NavLink to="/" className="btn-font">
              <img src={logo} alt="logo" height={32} width={32} />
              <p className={`underline-hover ${isMobile && "display-none"}`}>
                tärpit
              </p>
            </NavLink>
          </div>
          <div className={`nav-login ${!isMobile && "nav-wrapper"} `}>
            <NavLink to="/login" className="btn-font underline-hover">
              Login
            </NavLink>
            <NavLink to="/register" className="btn2-secondary">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
