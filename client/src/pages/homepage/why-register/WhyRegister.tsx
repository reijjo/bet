import "./WhyRegister.css";

import { Container2 } from "../../../components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChartLine,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

interface WhyRegisterProps {
  isMobile?: boolean;
}

export const WhyRegister = ({ isMobile }: WhyRegisterProps) => {
  const whyBoxes = [
    { id: 1, icon: faCheck, text: "Keep track of your bets" },
    { id: 2, icon: faChartLine, text: "Analytics improves your betting" },
    { id: 3, icon: faDumbbell, text: "You learn your betting strengths" },
  ];

  return (
    <section className="home-features-why">
      <div className="why-to-register wrapper-styles">
        <h2>Why you should register?</h2>
        <div className="why-to-register-boxes">
          {whyBoxes.map((box) => (
            <Container2 key={box.id} className="why-to-register-box">
              <FontAwesomeIcon
                icon={box.icon}
                size={isMobile ? "2x" : "3x"}
                data-testid="why-icon"
              />
              <p>{box.text}</p>
            </Container2>
          ))}
        </div>
      </div>
    </section>
  );
};
