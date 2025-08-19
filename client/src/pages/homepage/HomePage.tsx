import "./HomePage.css";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useScreenWidth } from "../../hooks/useScreenWidth";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { HeroSection, HomeFeatures, WhyRegister, PageFeature } from "./index";

const HomePage = () => {
  const { isMobile } = useScreenWidth();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dash";
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="flex-wrapper">
      <HeroSection navigate={navigate} />
      <HomeFeatures isMobile={isMobile} />
      <WhyRegister isMobile={isMobile} />
      <PageFeature />
    </div>
  );
};

export default HomePage;
