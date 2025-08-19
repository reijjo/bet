import "./HomeFeatures.css";

import add1 from "../../../assets/images/homepage/add1.png";
import add2 from "../../../assets/images/homepage/add2.png";
import dash from "../../../assets/images/homepage/dash.png";
import { FeatureCard } from "./FeatureCard";
import { Divider } from "../../../components";

interface HomeFeaturesProps {
  isMobile?: boolean;
}

export const HomeFeatures = ({ isMobile }: HomeFeaturesProps) => (
  <section className="home-features-section">
    <div className="home-features">
      <FeatureCard
        highlighted="Dashboard"
        text="shows a recap of your betting."
        image={dash}
        imageWidth="80%"
      />
      <div className="home-feature-addbet">
        <figure className="addbet-feature">
          <p style={isMobile ? { paddingTop: "2rem" } : {}}>
            <span>Add Bet</span> has many different bet types to choose from.{" "}
            <span>Single</span>, <span>Over</span>, <span>Under</span>,{" "}
            <span>Bet Builder</span> and more!
          </p>
          <img src={add1} alt="Add Bet" />
        </figure>
      </div>
      {isMobile && <Divider />}
      <div className="home-feature-addbet">
        <figure className="addbet-feature">
          <p className="addbet-feature-order">
            You can also add a <span>Single Bet</span> or a <span>Parlay</span>{" "}
            and your favorite <span>Tipper</span> and <span>Sport/League</span>{" "}
            that helps analyze the bets.
          </p>
          <img src={add2} alt="Add Bet" />
        </figure>
      </div>
    </div>
  </section>
);
