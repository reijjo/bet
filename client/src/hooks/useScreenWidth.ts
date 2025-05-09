import { useEffect, useState } from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState({
    isMobile: false,
    isTablet: false,
    isSidebarOpen: false,
  });

  useEffect(() => {
    const checkScreenWidth = () => {
      const width = window.innerWidth;
      setScreenWidth({
        isMobile: width <= 581,
        isTablet: width > 581 && width <= 800,
        isSidebarOpen: width >= 1180,
      });
    };

    // Initial check
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return screenWidth;
};
