import "./HomePage.css";

import { useEffect } from "react";

import {
  faBank,
  faChartLine,
  faCheck,
  faDumbbell,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

import add1 from "../../assets/images/homepage/add1.png";
import add2 from "../../assets/images/homepage/add2.png";
import dash from "../../assets/images/homepage/dash.png";
import { Divider } from "../../components";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { FeatureCard } from "./FeatureCard";
import { PageFeatureCard } from "./PageFeatureCard";
import { HeroSection } from "./hero/HeroSection";

const HomePage = () => {
  const { isMobile } = useScreenWidth();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dash";
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="flex-wrapper">
      <HeroSection navigate={navigate} />
      <section className="home-features-section">
        <div className="home-features">
          <FeatureCard
            highlighted="Dashboard"
            text="shows a recap of your betting."
            image={dash}
            imageWidth="80%"
            extraClass="span2"
          />
          <div className="home-feature-addbet">
            <figure className="addbet-feature">
              <p style={isMobile ? { paddingTop: "2rem" } : {}}>
                <span>Add Bet</span> has many different bet types to choose
                from. <span>Single</span>, <span>Over</span>, <span>Under</span>
                , <span>Bet Builder</span> and more!
              </p>
              <img src={add1} alt="Add Bet" />
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
              <img src={add2} alt="Add Bet" />
            </figure>
          </div>
        </div>
      </section>
      <section className="home-features-why">
        <div className="why-to-register wrapper-styles">
          <h2>Why you should register?</h2>
          <div className="why-to-register-boxes">
            <div className="why-to-register-box">
              <FontAwesomeIcon
                icon={faCheck}
                size={isMobile ? "2x" : "3x"}
                data-testid="why-icon"
              />
              <p>Keep track of your bets</p>
            </div>
            <div className="why-to-register-box">
              <FontAwesomeIcon
                icon={faChartLine}
                size={isMobile ? "2x" : "3x"}
                data-testid="why-icon"
              />
              <p>Analytics improves your betting</p>
            </div>
            <div className="why-to-register-box">
              <FontAwesomeIcon
                icon={faDumbbell}
                size={isMobile ? "2x" : "3x"}
                data-testid="why-icon"
              />
              <p>You learn your betting strengths</p>
            </div>
          </div>
        </div>
      </section>
      <section className="home-features-section-dark">
        <div className="home-features">
          <div className="page-features">
            <PageFeatureCard
              icon={faList}
              header="bets"
              text="Shows all your bets in one place with couple of filters and sorting options"
            />
            <PageFeatureCard
              icon={faChartLine}
              header="Analytics"
              text="Has a lot of different filters and sorting features and charts to learn from your bets"
            />
            <PageFeatureCard
              icon={faBank}
              header="transactions"
              text="Keeps track on your deposits and withdrawals"
            />
            <PageFeatureCard
              icon={faUser}
              header="profile"
              text="Here you can find different settings for your profile"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
