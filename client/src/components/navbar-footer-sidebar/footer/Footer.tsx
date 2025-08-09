import "./Footer.css";
import logo from "../../../assets/fishing.png";
import { useNavigate } from "react-router-dom";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { scrollToTop } from "../../../utils/helperFunctions";

export const Footer = () => {
  const copyright = String.fromCodePoint(169);
  const navigate = useNavigate();

  const toSomewhere = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer>
      <div className="wrapper extra-wrapper">
        <div className="top-footer">
          <div className="footer-logo">
            <img src={logo} alt="logo" height={24} width={24} />
            <h3>Tärpit</h3>
          </div>
          <div className="top-footer-links">
            <div className="footer-link-group">
              <h4>Support</h4>
              <a onClick={() => toSomewhere("/gibberish/feedback")}>
                Contact / Feedback
              </a>
              <a onClick={() => toSomewhere("/gibberish/faq")}>FAQ</a>
              <a onClick={() => toSomewhere("/gibberish/support")}>
                Support Me
              </a>
            </div>
            <div className="footer-link-group">
              <h4>Legal</h4>
              <a onClick={() => toSomewhere("/gibberish/terms")}>Terms</a>
              <a onClick={() => toSomewhere("/gibberish/privacy")}>Privacy</a>
            </div>
          </div>
        </div>
        <div className="under-footer">
          <div className="copyright">
            <p>{copyright} 2024 Reijjo.</p>
            <p>All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/reijjo/bet" target="_blank">
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/teemu-aitomeri/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
