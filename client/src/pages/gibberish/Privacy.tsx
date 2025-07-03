import { useScreenWidth } from "../../hooks/useScreenWidth";
import "./Gibberish.css";

const Privacy = () => {
  const { isMobile } = useScreenWidth();
  return (
    <div className="gibberish-page">
      <div className="gibberish-content">
        <h2>Privacy Policy</h2>
        <div
          className="gibberish-text"
          style={{ textAlign: isMobile ? "center" : "left" }}
        >
          <p>I don't collect personal data.</p>
          <p>Passwords are encrypted, and I have zero interest in your info.</p>
          <p>It stays yours.</p>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              marginTop: "1rem",
              gap: "0.5rem",
            }}
          >
            <p> Something on your mind?</p>
            <div>
              Share it{" "}
              <a href="/gibberish/feedback" className="link-text">
                here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
