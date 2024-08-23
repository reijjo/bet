import { Link } from "react-router-dom";
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

export const Sidebar = () => {
  return (
    <div className={`sidebar`}>
      <div className="sidebar-close">
        <a className="hamburger">
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>

      <div className="sidebar-logo">
        <h3>Logo</h3>
      </div>
      <div className="sidebar-links">
        <Link to="/dash">
          <FontAwesomeIcon icon={faTableColumns} size="xs" />
          <p>Dashboard</p>
        </Link>
        <Link to="/dash">
          <FontAwesomeIcon icon={faPenToSquare} size="xs" />
          <p>Bets</p>
        </Link>
        <Link to="/dash">
          <FontAwesomeIcon icon={faChartLine} size="xs" />
          <p>Analytics</p>
        </Link>
      </div>
      <div className="sidebar-links bottom-links">
        <Divider />
        <Link to="/dash">
          <FontAwesomeIcon icon={faUser} size="xs" />
          <p>Profile</p>
        </Link>
        <Link to="/dash">
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
