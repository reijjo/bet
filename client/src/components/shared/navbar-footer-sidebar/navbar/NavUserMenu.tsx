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

import { useLogoutMutation } from "../../../../features/api/authApi";
import { logoutUser } from "../../../../features/slices/authSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { Divider } from "../../../ui/divider/Divider";

interface NavUserMenuProps {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  setIsUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavUserMenu = ({
  dropdownRef,
  setIsUserMenuOpen,
}: NavUserMenuProps) => {
  const [logout, { isLoading }] = useLogoutMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-menu" data-testid="user-menu" ref={dropdownRef}>
      <ul>
        <li className="user-menu-item">
          <Link onClick={() => setIsUserMenuOpen(false)} to="/dash">
            Dashboard
          </Link>
          <FontAwesomeIcon icon={faTableColumns} />
        </li>
        <li className="user-menu-item">
          <Link onClick={() => setIsUserMenuOpen(false)} to="/analytics">
            Analytics
          </Link>
          <FontAwesomeIcon icon={faChartLine} />
        </li>
        <li className="user-menu-item">
          <Link onClick={() => setIsUserMenuOpen(false)} to="/bank">
            Transactions
          </Link>
          <FontAwesomeIcon icon={faBank} />
        </li>
        <Divider />
        <li className="user-menu-item">
          <Link onClick={() => setIsUserMenuOpen(false)} to="/add-bet">
            Add bet
          </Link>
          <FontAwesomeIcon icon={faPenToSquare} />
        </li>
        <li className="user-menu-item">
          <Link onClick={() => setIsUserMenuOpen(false)} to="/bets">
            Bets
          </Link>
          <FontAwesomeIcon icon={faList} />
        </li>
        <Divider />
        <li className="user-menu-item">
          <Link onClick={() => setIsUserMenuOpen(false)} to="/">
            Profile
          </Link>
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
