import "./Navbar.css";
import "../common/Button.css";
import { Link } from "react-router-dom";
import { Button } from "../../components";

export const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <div className="nav-links">
          <div className="nav-logo">OnlyTsäänssi</div>
          <div className="nav-login">
            <Button
              children={
                <Link to="/" className="underline-hover">
                  Login
                </Link>
              }
              type="button"
              className="btn text-btn"
            />

            <Button
              type="button"
              className="btn outline-btn"
              children="Sign Up"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
