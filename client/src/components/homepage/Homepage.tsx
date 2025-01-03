import "./Homepage.css";

import { useNavigate } from "react-router-dom";

import bb from "../../assets/images/bb-crop.jpeg";
import { Button } from "../common/button/Button";

export const Homepage = () => {
  const navigate = useNavigate();

  const spotsLeft = "99";

  return (
    <div className="wrapper">
      <div className="hero-section">
        <div className="hero-text">
          <h5>Only {spotsLeft} spots left for the beta!</h5>
          <h1>Track your bets online without annoying excel sheets</h1>
          <p>
            But we have all the best features from Excel sheets to analyze and
            track your bets on the go!{" "}
          </p>
          <div className="hero-buttons">
            <Button
              type="button"
              className="btn btn-filled"
              children="Sign Up!"
              onClick={() => navigate("/dash")}
            />
            <Button
              type="button"
              className="btn btn-outline"
              children="Try Demo"
              onClick={() => navigate("/dash")}
            />
          </div>
        </div>
        <div className="hero-image">
          <img src={bb} alt="hero-bb" />
        </div>
      </div>
    </div>
  );
};
