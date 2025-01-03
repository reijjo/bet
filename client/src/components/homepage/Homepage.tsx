import "./Homepage.css";

import { useNavigate } from "react-router-dom";

import add1 from "../../assets/images/homepage/add1.png";
import add2 from "../../assets/images/homepage/add2.png";
import bb from "../../assets/images/homepage/bb-crop.jpeg";
// import bets from "../../assets/images/homepage/bets.png";
import dash from "../../assets/images/homepage/dash.png";
import { Button } from "../common/button/Button";
import { FeatureCard } from "./FeatureCard";

export const Homepage = () => {
  const navigate = useNavigate();

  const spotsLeft = "99";

  return (
    <div className="flex-wrapper">
      <section className="wrapper vh-wrapper ">
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
      </section>
      <section className="home-features-section">
        {/* <h2 className="wrapper-styles">Check the Features:</h2> */}
        <div className="home-features wrapper-styles">
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

          {/* <FeatureCard
            highlighted="Bets"
            text="section shows all your bets in one place."
            image={bets}
            extraClass="span2"
          /> */}
        </div>
      </section>
      <section className="home-features-why">
        <div className="why-to-register wrapper-styles">
          <h2>Why you should register?</h2>
        </div>
      </section>
    </div>
  );
};
