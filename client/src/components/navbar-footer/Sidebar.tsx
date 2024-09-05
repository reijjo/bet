import "./Sidebar.css";

import { Link } from "react-router-dom";
import { Divider, LinkWithIcon } from "../index";
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

  return (
    <div className={`sidebar ${sideBarOpen ? "active" : ""}`}>
      <div className="sidebar-close">
        <a className="hamburger" onClick={() => dispatch(closeSidebar())}>
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>

      <Link to="/" className="sidebar-logo">
        <h3>OnlyTsäänssi</h3>
      </Link>
      <div className="sidebar-links">
        <LinkWithIcon
          link="/dash"
          icon={faTableColumns}
          iconSize="xs"
          linkText="Dashboard"
        />
        <LinkWithIcon
          link="/bets"
          icon={faPenToSquare}
          iconSize="xs"
          linkText="Bets"
        />
        <LinkWithIcon
          link="/analytics"
          icon={faChartLine}
          iconSize="xs"
          linkText="Analytics"
        />
      </div>
      <div className="sidebar-links bottom-links">
        <Divider />
        <LinkWithIcon
          link="/profile"
          icon={faUser}
          iconSize="xs"
          linkText="Profile"
        />
        <LinkWithIcon
          link="/settings"
          icon={faGear}
          iconSize="xs"
          linkText="Settings"
        />
        <Divider />
        <LinkWithIcon
          link="/logout"
          className="logout-button"
          icon={faArrowRightFromBracket}
          iconSize="xs"
          linkText="Logout"
        />
      </div>
    </div>
  );
};
