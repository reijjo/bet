import { Link } from "react-router-dom";
import "./Gibberish.css";
import { Questions } from "./Questions";

const Faq = () => {
  return (
    <div className="gibberish-page">
      <div className="gibberish-content">
        <h2>Frequently Asked Questions</h2>
        <div className="gibberish-text">
          <p>Welcome to the FAQ section!</p>
          <p>
            Here you can find answers to common questions about our service. If
            you have any other questions, feel free to{" "}
            <Link to="/gibberish/feedback" className="link-text">
              send us feedback
            </Link>
            .
          </p>
        </div>
        <Questions />
      </div>
    </div>
  );
};

export default Faq;
