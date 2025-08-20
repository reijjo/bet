import "./Gibberish.css";

const Privacy = () => {
  return (
    <div className="gibberish-page">
      <div className="gibberish-content">
        <h2>Privacy Policy</h2>
        <div className="gibberish-text">
          <p>I don't collect personal data.</p>
          <p>
            Passwords are encrypted, and I have zero interest in your info. It
            stays yours.
          </p>
          <div>
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
