import "./NavbarUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openSidebar } from "../../slices/sidebarSlice";

export const NavbarUser = () => {
  const sideBarOpen = useAppSelector((state) => state.sidebar.sidebar);
  const dispatch = useAppDispatch();

  console.log("side open", sideBarOpen);
  return (
    <nav>
      <div className="wrapper">
        <div className="nav-links">
          <div className="nav-menu">
            <a className="hamburger" onClick={() => dispatch(openSidebar())}>
              <FontAwesomeIcon icon={faBars} />
            </a>
          </div>
          <div className="nav-logo">Logo</div>
          <div className="nav-profile">
            <div className="nav-profile-img">
              <img
                src="https://via.placeholder.com/150"
                alt="profile"
                title="username"
              />
            </div>
            <div className="nav-profile">
              <p>Username</p>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
