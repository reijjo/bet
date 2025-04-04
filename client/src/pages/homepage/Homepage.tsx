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
import bets from "../../assets/images/homepage/bets.png";
import dash from "../../assets/images/homepage/dash.png";
import { Button, Divider } from "../../components/";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { FeatureCard } from "./FeatureCard";

export const Homepage = () => {
  const { isMobile } = useScreenWidth();
  const navigate = useNavigate();

  return (
    <div className="flex-wrapper">
      <section className="hero-section">
        <div className="hero-wrapper wrapper">
          <div className="hero-text">
            <h4>Discover the Bet Tracking Platform 10+ Users Love</h4>
            <div className="hero-slogan">
              <h1>Track your bets online without annoying excel sheets!</h1>
              <p>
                But we have all the best features from Excel sheets to analyze
                and track your bets on the go!{" "}
              </p>
            </div>
            <div className="hero-buttons">
              <Button
                type="button"
                className="btn btn-filled"
                children="Sign Up here!"
                onClick={() => navigate("/register")}
                height="3rem"
              />
              {/* <Button
                type="button"
                className="btn btn-outline"
                children="Try Demo"
                onClick={() => navigate("/dash")}
                height="3rem"
              /> */}
            </div>
          </div>
        </div>
      </section>
      <section className="home-features-section">
        <div className="home-features">
          <FeatureCard
            highlighted="Dashboard"
            text="shows a recap of your betting."
            image={dash}
            imageWidth="80%"
            extraClass="span2"
          />
          {isMobile && <Divider />}
          <div className="home-feature-addbet">
            <figure className="addbet-feature">
              <p>
                <span>Add Bet</span> has many different bet types to choose
                from. <span>Single</span>, <span>Over</span>, <span>Under</span>
                , <span>Bet Builder</span> and more!
              </p>
              <img src={add1} alt="Add Bet" width="60%" />
            </figure>
          </div>
          {isMobile && <Divider />}
          <div className="home-feature-addbet">
            <figure className="addbet-feature">
              <p className="addbet-feature-order">
                You can also add a <span>Single Bet</span> or a{" "}
                <span>Parlay</span> and your favorite <span>Tipper</span> and{" "}
                <span>Sport/League</span> that helps analyze the bets.
              </p>
              <img src={add2} alt="Add Bet" width="60%" />
            </figure>
          </div>
        </div>
      </section>
      <section className="home-features-why">
        <div className="why-to-register wrapper-styles">
          <h2>Why you should register?</h2>
          <div className="why-to-register-boxes">
            <div className="why-to-register-box">
              <FontAwesomeIcon icon={faCheck} size={isMobile ? "2x" : "3x"} />
              {/* <p>Keep track of your bets and stay organized</p> */}
              <p>Keep track of your bets</p>
            </div>
            <div className="why-to-register-box">
              <FontAwesomeIcon
                icon={faChartLine}
                size={isMobile ? "2x" : "3x"}
              />
              <p>Analytics improves your betting</p>
            </div>
            <div className="why-to-register-box">
              <FontAwesomeIcon
                icon={faDumbbell}
                size={isMobile ? "2x" : "3x"}
              />
              <p>You learn your betting strenghts</p>
            </div>
          </div>
        </div>
      </section>
      <section className="home-features-section-dark">
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
