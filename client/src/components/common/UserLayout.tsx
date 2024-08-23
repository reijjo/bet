import { Outlet } from "react-router-dom";
import { Footer, NavbarUser, Sidebar } from "../index";
import { useEffect, useState } from "react";

type UserLayoutProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const UserLayout = ({
  sidebarOpen,
  setSidebarOpen,
}: UserLayoutProps) => {
  const [smallScreen, setSmallScreen] = useState<boolean>(
    window.innerWidth < 1000
  );

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("sidebaropen", sidebarOpen);

  return smallScreen ? (
    <main className="main-logged-small">
      {sidebarOpen && (
        <Sidebar
          smallScreen={smallScreen}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      )}
      <NavbarUser
        smallScreen={smallScreen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Outlet />
      <Footer />
    </main>
  ) : (
    <main className="main-logged">
      <Sidebar smallScreen={smallScreen} setSidebarOpen={setSidebarOpen} />
      <div className="main-dashboard">
        <NavbarUser
          smallScreen={smallScreen}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};
