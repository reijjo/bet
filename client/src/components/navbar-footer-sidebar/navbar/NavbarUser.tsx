import "./NavbarUser.css";

import { useEffect, useRef, useState } from "react";

import {
  faBars,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../../../assets/fishing.png";
import profilepic from "../../../assets/images/stockprofilepic.jpg";
import { openSidebar } from "../../../features/sidebarSlice";
import { useScreenWidth } from "../../../hooks/useScreenWidth";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { NavUserMenu } from "./NavUserMenu";

export const NavbarUser = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile, isSidebarOpen } = useScreenWidth();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

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
    <nav className="nav-user">
      <div className={`wrapper ${!isSidebarOpen ? "nav-user-wrapper" : ""}`}>
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
          {/* <Link to="/addbet">Add Bet</Link> */}
          <div
            className={`nav-profile ${isSidebarOpen ? "nav-user-wrapper" : ""}`}
          >
            <div className="user-img-wrapper">
              <div className="nav-profile-img">
                <img
                  src={profilepic}
                  alt="profilePicture"
                  title="Profile Picture"
                  onClick={toggleUserMenu}
                />
              </div>
              <a className="nav-profile" onClick={toggleUserMenu}>
                <p className="nav-profile-username">{user?.username}</p>
                {!isUserMenuOpen ? (
                  <FontAwesomeIcon icon={faCaretDown} className="caret-icon" />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} className="caret-icon" />
                )}
              </a>
            </div>
            {isUserMenuOpen && (
              <NavUserMenu
                dropdownRef={dropdownRef}
                setIsUserMenuOpen={setIsUserMenuOpen}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
