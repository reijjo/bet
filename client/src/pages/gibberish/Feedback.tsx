import { useState } from "react";
import { Button2 } from "../../components/common/v2.0/button/Button2";
import { TextArea2 } from "../../components/common/v2.0/inputs/TextArea2";
import { TextInput2 } from "../../components/common/v2.0/inputs/TextInput2";
import "./Gibberish.css";
import { FeedbackMessage } from "../../utils/types";
import { useAddFeedbackMutation } from "../../features/api/feedbackApi";

const Feedback = () => {
  const initialFeedback: FeedbackMessage = {
    name: "",
    email: "",
    message: "",
  };

  const [feedback, setFeedback] = useState<FeedbackMessage>(initialFeedback);
  const [addFeedback, { data, isLoading, isError, error }] =
    useAddFeedbackMutation();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    try {
      await addFeedback(feedback).unwrap();
      setFeedback(initialFeedback);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
    console.log("Feedback submitted", feedback);
  };

  const handleReset = () => {
    setFeedback(initialFeedback);
  };

  console.log("Feedback data:", data);
  console.error("Feedback error:", isError, error);

  return (
    <div className="gibberish-page">
      <div className="gibberish-content">
        <h2>Feedback / Suggestions</h2>
        <div className="gibberish-text centered-text">
          <p>I really appreciate your feedback and suggestions.</p>
          <p>
            This is a personal project, and I want to make it better for you.
          </p>
        </div>
        <form className="form-feedback" onSubmit={handleSubmit}>
          <TextInput2
            id="name"
            name="name"
            label="Your Name"
            placeholder="Name"
            required
            onChange={handleInputChange}
            value={feedback.name}
          />
          <TextInput2
            type="email"
            id="email"
            name="email"
            label="Your Email"
            placeholder="Add email if you want response"
            optional
            onChange={handleInputChange}
            value={feedback.email}
          />
          <TextArea2
            id="message"
            name="message"
            label="Message"
            rows={5}
            placeholder="Just tell me whatever comes to your mind..."
            required
            onChange={handleInputChange}
            value={feedback.message}
          />
          <div className="btn-group">
            <Button2 type="submit" className="btn2-cta" disabled={isLoading}>
              {isLoading ? "Sending..." : "Submit Feedback"}
            </Button2>
            <Button2
              type="reset"
              className="btn2-outline"
              onClick={handleReset}
              disabled={isLoading}
            >
              Clear Fields
            </Button2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
