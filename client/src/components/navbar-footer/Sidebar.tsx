import { Link, useLocation } from "react-router-dom";
import { Divider } from "../index";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faArrowRightFromBracket,
  faChartLine,
  faTableColumns,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeSidebar } from "../../slices/sidebarSlice";

export const Sidebar = () => {
  const sideBarOpen = useAppSelector((state) => state.sidebar.sidebar);
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <div className={`sidebar ${sideBarOpen ? "active" : ""}`}>
      <div className="sidebar-close">
        <a className="hamburger" onClick={() => dispatch(closeSidebar())}>
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>

      <Link to="/" className="sidebar-logo">
        <h3>Logo</h3>
      </Link>
      <div className="sidebar-links">
        <Link
          to="/dash"
          className={location.pathname === "/dash" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faTableColumns} size="xs" />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/bets"
          className={location.pathname === "/bets" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="xs" />
          <p>Bets</p>
        </Link>
        <Link
          to="/analytics"
          className={location.pathname === "/analytics" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faChartLine} size="xs" />
          <p>Analytics</p>
        </Link>
      </div>
      <div className="sidebar-links bottom-links">
        <Divider />
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faUser} size="xs" />
          <p>Profile</p>
        </Link>
        <Link
          to="/settings"
          className={location.pathname === "/settings" ? "active-link" : ""}
        >
          <FontAwesomeIcon icon={faGear} size="xs" />
          <p>Settings</p>
        </Link>

        <Divider />
        <Link to="/dash" className="logout-button">
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="xs" />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};
