import "./NavbarUser.css";

import { useEffect, useRef, useState } from "react";

import {
  faArrowRightFromBracket,
  faBank,
  faBars,
  faCaretDown,
  faCaretUp,
  faChartLine,
  faGear,
  faList,
  faPenToSquare,
  faTableColumns,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { Divider } from "../../";
import logo from "../../../assets/fishing.png";
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
            <img src={logo} alt="logo" height={32} width={32} />
            <h3>Tärpit</h3>
            <img src={logo} alt="logo" height={32} width={32} />
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
                <p className="nav-profile-username">{USER}</p>
                {!isUserMenuOpen ? (
                  <FontAwesomeIcon icon={faCaretDown} className="caret-icon" />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} className="caret-icon" />
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
                    <FontAwesomeIcon icon={faTableColumns} />
                  </li>
                  <li className="user-menu-item">
                    <Link to="/analytics">Analytics</Link>
                    <FontAwesomeIcon icon={faChartLine} />
                  </li>
                  <li className="user-menu-item">
                    <Link to="/bank">Transactions</Link>
                    <FontAwesomeIcon icon={faBank} />
                  </li>
                  <Divider />
                  <li className="user-menu-item">
                    <Link to="/add-bet">Add bet</Link>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </li>
                  <li className="user-menu-item">
                    <Link to="/bets">Bets</Link>
                    <FontAwesomeIcon icon={faList} />
                  </li>
                  <Divider />
                  <li className="user-menu-item">
                    <Link to="/">Profile</Link>
                    <FontAwesomeIcon icon={faUser} />
                  </li>
                  <li className="user-menu-item">
                    <Link to="/">Settings</Link>
                    <FontAwesomeIcon icon={faGear} />
                  </li>
                  <Divider />
                  <li className="user-menu-logout">
                    <a onClick={() => console.log("logout")}>Logout</a>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
