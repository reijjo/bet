import "./Sidebar.css";

import {
  faArrowRightFromBracket,
  faBank,
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

import logo from "../../../assets/fishing.png";
import { useLogoutMutation } from "../../../features/api/authApi";
import { logoutUser } from "../../../features/authSlice";
import { closeSidebar } from "../../../features/sidebarSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Divider, LinkWithIcon } from "../../index";

export const Sidebar = () => {
  const [logout, { isLoading, error }] = useLogoutMutation();
  const sideBarOpen = useAppSelector((state) => state.sidebar.sidebar);
  const modalOpen = useAppSelector((state) => state.modal.isModalOpen);
  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      dispatch(closeSidebar());

      console.log("logout");
    } catch (error) {
      console.error(error);
    }
  };

  console.log("ERROR MUTATION", error);

  return (
    <div
      className={`sidebar ${sideBarOpen ? "active" : ""}`}
      data-testid="sidebar"
      style={{ zIndex: modalOpen ? 9 : 15 }}
    >
      <div className="sidebar-close">
        <a className="hamburger" onClick={handleCloseSidebar}>
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>

      <Link to="/" className="sidebar-logo" onClick={handleCloseSidebar}>
        <img src={logo} alt="logo" height={32} width={32} />
        <h3>Tärpit</h3>
      </Link>
      <div className="sidebar-links">
        <LinkWithIcon
          link="/dash"
          icon={faTableColumns}
          iconSize="xs"
          linkText="Dashboard"
          onClick={handleCloseSidebar}
        />
        <LinkWithIcon
          link="/analytics"
          icon={faChartLine}
          iconSize="xs"
          linkText="Analytics"
          onClick={handleCloseSidebar}
        />
        <LinkWithIcon
          link="/bank"
          icon={faBank}
          iconSize="xs"
          linkText="Deposit / Withdraw"
          onClick={handleCloseSidebar}
        />
        <LinkWithIcon
          link="/add-bet"
          icon={faPenToSquare}
          iconSize="xs"
          linkText="Add Bet"
          onClick={handleCloseSidebar}
        />
        <LinkWithIcon
          link="/bets"
          icon={faList}
          iconSize="xs"
          linkText="Bets"
          onClick={handleCloseSidebar}
        />
      </div>

      <div className="sidebar-links bottom-links">
        <Divider color="var(--primary-800)" />
        <LinkWithIcon
          link="/profile"
          icon={faUser}
          iconSize="xs"
          linkText="Profile"
          onClick={handleCloseSidebar}
        />
        <LinkWithIcon
          link="/settings"
          icon={faGear}
          iconSize="xs"
          linkText="Settings"
          onClick={handleCloseSidebar}
        />
        <Divider color="var(--primary-800)" />
        <LinkWithIcon
          link="/"
          className="logout-button"
          icon={faArrowRightFromBracket}
          iconSize="xs"
          linkText={isLoading ? "Logging out..." : "Logout"}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};
