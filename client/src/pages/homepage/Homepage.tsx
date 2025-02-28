import "./Homepage.css";

import {
  faChartLine,
  faCheck,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import add1 from "../../assets/images/homepage/add1.png";
import add2 from "../../assets/images/homepage/add2.png";
import bb from "../../assets/images/homepage/bb-crop.jpeg";
import bets from "../../assets/images/homepage/bets.png";
import dash from "../../assets/images/homepage/dash.png";
import { Button } from "../../components/";
import { FeatureCard } from "./FeatureCard";

export const Homepage = () => {
  const navigate = useNavigate();

  const spotsLeft = "99";

  return (
    <div className="flex-wrapper">
      <section className="wrapper vh-wrapper ">
        <div className="hero-section">
          <div className="hero-text">
            <h4>Only {spotsLeft} spots left for the beta!</h4>
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
      </section>
      <section className="home-features-section">
        {/* <h2 className="wrapper-styles">Check the Features:</h2> */}
        <div className="home-features">
          <FeatureCard
            highlighted="Dashboard"
            text="shows a recap of your betting."
            image={dash}
            imageWidth="80%"
            extraClass="span2"
          />
          <div className="home-feature-addbet">
            <figure className="home-feature-addbet-image1">
              <figcaption>
                <span>Add Bet</span> has different bet types and leagues to
                choose from.
              </figcaption>
              <img src={add1} alt="Add Bet" width="100%" />
            </figure>
            <figure className="home-feature-addbet-image2">
              <figcaption>
                You can also add a <span>single bet</span> or a{" "}
                <span>parlay</span>.
              </figcaption>
              <img src={add2} alt="Add Bet" width="100%" />
            </figure>
          </div>
        </div>
      </section>
      <section className="home-features-why">
        <div className="why-to-register wrapper-styles">
          <h2>Why you should register?</h2>
          <div className="why-to-register-boxes">
            <div className="why-to-register-box">
              <FontAwesomeIcon icon={faCheck} size="2x" />
              <p>Keep track of your bets</p>
            </div>
            <div className="why-to-register-box">
              <FontAwesomeIcon icon={faChartLine} size="2x" />
              <p>Analytics improves your betting</p>
            </div>
            <div className="why-to-register-box">
              <FontAwesomeIcon icon={faDumbbell} size="2x" />
              <p>You learn your betting strenghts</p>
            </div>
          </div>
        </div>
      </section>
      <section className="home-features-section">
        <div className="home-features">
          <FeatureCard
            highlighted="Bets"
            text="section shows all your bets in one place."
            image={bets}
            imageWidth="80%"
            extraClass="span2"
          />
        </div>
      </section>
    </div>
  );
};
