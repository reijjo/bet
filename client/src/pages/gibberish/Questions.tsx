import "./Questions.css";
import { Container2 } from "../../components/common/v2.0/container/Container2";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export const Questions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const faqs = [
    {
      id: 1,
      question: "Why there are so many pages still under construction?",
      answer:
        "Because I was stupid when I started this project, and I just wanted the basic functionality to work, and didn't write any tests. Now I have found some annoying bugs, and I have to go back and fix everything.",
    },
    {
      id: 2,
      question:
        "Why does it sometimes take so much time for example to log in?",
      answer:
        "I've deployed this app on a free tier of a cloud provider, and it has very limited resources. So if the server is idle for a while, it goes to sleep, and when you try to access it, it takes some time to wake up.",
    },
  ];

  return (
    <Container2>
      {faqs.map((faq) => (
        <Fragment key={faq.id}>
          <a className="toggle-faq" onClick={() => toggleFaq(faq.id)}>
            <h4>{faq.question}</h4>
            <FontAwesomeIcon icon={openFaq === faq.id ? faMinus : faPlus} />
          </a>
          {openFaq === faq.id && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </Fragment>
      ))}
    </Container2>
  );
};
