import "./Homepage.css";

import { useNavigate } from "react-router-dom";

import bb from "../../assets/images/bb-crop.jpeg";
import add1 from "../../assets/images/homepage/add1.png";
import add2 from "../../assets/images/homepage/add2.png";
import bets from "../../assets/images/homepage/bets.png";
import dash from "../../assets/images/homepage/dash.png";
import { Button } from "../common/button/Button";
import { FeatureCard } from "./FeatureCard";

export const Homepage = () => {
  const navigate = useNavigate();

  const spotsLeft = "99";

  return (
    <div className="wrapper flex-wrapper">
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
      <h2>Contains at least these Features:</h2>
      <div className="home-features">
        <FeatureCard
          highlighted="Dashboard"
          text="shows a recap of your betting."
          image={dash}
          extraClass="span2"
        />
        <FeatureCard
          highlighted="Add Bet"
          text="has different bet types and leagues to choose from. "
          image={add1}
        />
        <FeatureCard
          text="You can also add a single bet or a parlay."
          image={add2}
        />
        <FeatureCard
          highlighted="Bets"
          text="section shows all your bets in one place."
          image={bets}
          extraClass="span2"
        />
      </div>
    </div>
  );
};
