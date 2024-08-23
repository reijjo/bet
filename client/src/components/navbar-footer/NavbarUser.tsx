import "./NavbarUser.css";
import "../common/Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const NavbarUser = () => {
  return (
    <nav>
      <div className="wrapper">
        <div className="nav-links">
          <div className="nav-menu">
            <a className="hamburger">
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
