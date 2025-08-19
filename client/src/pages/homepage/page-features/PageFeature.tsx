import "./PageFeature.css";

import { PageFeatureCard } from "./PageFeatureCard";

import {
  faBank,
  faChartLine,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const PageFeature = () => {
  const pageFeatures = [
    {
      id: 1,
      icon: faList,
      header: "bets",
      text: "Shows all your bets in one place with couple of filters and sorting options",
    },
    {
      id: 2,
      icon: faChartLine,
      header: "Analytics",
      text: "Has a lot of different filters and sorting features and charts to learn from your bets",
    },
    {
      id: 3,
      icon: faBank,
      header: "transactions",
      text: "Keeps track on your deposits and withdrawals",
    },
    {
      id: 4,
      icon: faUser,
      header: "profile",
      text: "Here you can find different settings for your profile",
    },
  ];

  return (
    <section className="home-features-section-dark">
      <div className="home-features">
        <div className="page-features">
          {pageFeatures.map((feature) => (
            <PageFeatureCard
              key={feature.id}
              icon={feature.icon}
              header={feature.header}
              text={feature.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
