import "./Sidebar.css";

import {
  faArrowRightFromBracket,
  faChartLine,
  faGear,
  faList,
  faPenToSquare,
  faTableColumns,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { closeSidebar } from "../../../reducers/sidebarReducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Divider, LinkWithIcon } from "../../index";

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
        <h3>Tärpit</h3>
      </Link>
      <div className="sidebar-links">
        <LinkWithIcon
          link="/dash"
          icon={faTableColumns}
          iconSize="xs"
          linkText="Dashboard"
        />
        <LinkWithIcon
          link="/analytics"
          icon={faChartLine}
          iconSize="xs"
          linkText="Analytics"
        />
        <Divider />
        <LinkWithIcon
          link="/add-bet"
          icon={faPenToSquare}
          iconSize="xs"
          linkText="Add Bet"
        />
        <LinkWithIcon
          link="/bets"
          icon={faList}
          iconSize="xs"
          linkText="Bets"
        />
      </div>

      <div className="sidebar-links bottom-links">
        <Divider color="var(--primary-800)" />
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
        <Divider color="var(--primary-800)" />
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
