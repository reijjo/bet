import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="hero-section">
        <h1>Track your bets online without annoying excel sheets</h1>
        <p>
          But we have all the best features from Excel sheets to analyze and
          track your bets on the go!{" "}
        </p>
        <Button
          type="button"
          className="btn big-btn"
          children="Start here!"
          onClick={() => navigate("/dash")}
        />
      </div>
      <h1 style={{ color: "var(--primary)" }}>bun header1 primary</h1>
      <h2 style={{ color: "var(--primary-dark)" }}>bun header2 primary-dark</h2>
      <h3 style={{ color: "var(--primary-light)" }}>
        bun header3 primary-light
      </h3>
      <h1 style={{ color: "var(--secondary)" }}>bun header1 secondary</h1>
      <h2>bun header2 secondary-dark</h2>
      <h3 style={{ color: "var(--secondary-light)" }}>
        bun header3 secondary-light
      </h3>
    </div>
  );
};
