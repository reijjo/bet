import "./NavbarUser.css";

import { useEffect, useRef, useState } from "react";

import {
  faBars,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { Divider } from "../../";
import profilepic from "../../../assets/images/stockprofilepic.jpg";
import { openSidebar } from "../../../features/sidebarSlice";
import { useScreenWidth } from "../../../hooks/useScreenWidth";
import { useAppDispatch } from "../../../store/hooks";

const USER = "TestUser";

export const NavbarUser = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useScreenWidth();

  const dispatch = useAppDispatch();

  // Closes dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !(event.target as Element).closest(".nav-profile")
    ) {
      setIsUserMenuOpen(false);
    }
  };

  //
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="nav-links">
          <div className="nav-menu" data-testid="nav-menu">
            <a className="hamburger" onClick={() => dispatch(openSidebar())}>
              <FontAwesomeIcon icon={faBars} />
            </a>
          </div>
          <div className={`nav-logo ${isMobile ? "none" : ""}`}>
            <h3>Tärpit</h3>
          </div>
          <div className="nav-profile">
            <div className="user-img-wrapper">
              <div className="nav-profile-img">
                <img
                  src={profilepic}
                  alt="profilePicture"
                  title="Profile Picture"
                />
              </div>
              <a className="nav-profile" onClick={toggleUserMenu}>
                <p>{USER}</p>
                {!isUserMenuOpen ? (
                  <FontAwesomeIcon icon={faCaretDown} />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
              </a>
            </div>
            {isUserMenuOpen && (
              <div
                className="user-menu"
                data-testid="user-menu"
                ref={dropdownRef}
              >
                <ul>
                  <li className="user-menu-item">
                    <Link to="/dash">Dashboard</Link>
                  </li>
                  <li className="user-menu-item">
                    <a onClick={() => console.log("something")}>Analytics</a>
                  </li>
                  <Divider />
                  <li className="user-menu-item">
                    <Link to="/add-bet">Add bet</Link>
                  </li>
                  <li className="user-menu-item">
                    <Link to="/bets">Bets</Link>
                  </li>
                  <Divider />
                  <li className="user-menu-item">
                    <Link to="/">Profile</Link>
                  </li>
                  <li className="user-menu-item">
                    <Link to="/">Settings</Link>
                  </li>
                  <Divider />
                  <li className="user-menu-logout">
                    <a onClick={() => console.log("logout")}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
