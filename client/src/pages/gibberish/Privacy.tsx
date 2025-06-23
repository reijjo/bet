import "./Gibberish.css";

const Privacy = () => (
  <div className="gibberish-page">
    <div className="gibberish-content">
      <h2>Privacy Policy</h2>
      <p>
        I don't collect personal data. Passwords are encrypted, and I have zero
        interest in your info. It stays yours.
      </p>
      <div className="flex-column">
        <p> Something on your mind? </p>
        <p>
          Share it{" "}
          <a href="/gibberish/feedback" className="link-text">
            here!
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Privacy;
