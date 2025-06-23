import { Button2 } from "../../components/common/v2.0/button/Button2";
import { TextArea2 } from "../../components/common/v2.0/inputs/TextArea2";
import { TextInput2 } from "../../components/common/v2.0/inputs/TextInput2";
import "./Gibberish.css";

const Feedback = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Feedback submitted");
  };

  return (
    <div className="gibberish-page">
      <div className="gibberish-content">
        <h2>Feedback / Suggestions</h2>
        <p>
          I really appreciate your feedback and suggestions. This is a personal
          project, and I want to make it better for you.
        </p>
        <form className="form-feedback" onSubmit={handleSubmit}>
          <TextInput2 id="yourname" label="Your Name" placeholder="Name" />
          <TextInput2
            type="email"
            id="email"
            label="Your Email"
            placeholder="Add email if you want response"
            optional
          />
          <TextArea2
            id="feedback"
            label="Message"
            rows={5}
            placeholder="Just tell me whatever comes to your mind..."
          />
          <div className="btn-group">
            <Button2 type="submit" className="btn2-cta" disabled>
              Submit Feedback
            </Button2>
            <Button2 type="reset" className="btn2-outline" disabled>
              Clear Fields
            </Button2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
