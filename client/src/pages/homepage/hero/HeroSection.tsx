import "./HeroSection.css";
import { Button2 } from "../../../components/ui/v2/button/Button2";

interface HeroSectionProps {
  navigate: (path: string) => void;
}

export const HeroSection = ({ navigate }: HeroSectionProps) => (
  <section className="hero-section">
    <div className="hero-wrapper wrapper">
      <div className="hero-text">
        {/* <h4>Discover the Bet Tracking Platform 10+ Users Love</h4> */}
        <h4>Discover the Bet Tracking Platform that everyone Loves</h4>
        <div className="hero-slogan">
          <h1>Track your bets online without annoying excel sheets!</h1>
          <p>
            But we have all the best features from Excel sheets to analyze and
            track your bets on the go!{" "}
          </p>
        </div>
        <div className="hero-buttons">
          <Button2
            type="button"
            className="btn2-cta btn-big"
            children="Sign Up here!"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
    </div>
  </section>
);
