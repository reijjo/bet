import "./NavUserMenu.css";

import {
  faArrowRightFromBracket,
  faBank,
  faChartLine,
  faList,
  faPenToSquare,
  faTableColumns,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../../features/api/authApi";
import { logoutUser } from "../../../features/authSlice";
import { useAppDispatch } from "../../../store/hooks";
import { Divider } from "../../common/divider/Divider";

interface NavUserMenuProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const NavUserMenu = ({ dropdownRef }: NavUserMenuProps) => {
  const [logout, { isLoading }] = useLogoutMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate("/");
      console.log("logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-menu" data-testid="user-menu" ref={dropdownRef}>
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
        <Divider />
        <li className="user-menu-logout">
          <a onClick={handleLogout}>
            {isLoading ? "Logging out..." : "Logout"}
          </a>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </li>
      </ul>
    </div>
  );
};
