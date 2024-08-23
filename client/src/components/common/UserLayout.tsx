import { Outlet } from "react-router-dom";
import { Footer, NavbarUser, Sidebar } from "../index";
// import { useEffect, useState } from "react";

export const UserLayout = () => {
  // const [smallScreen, setSmallScreen] = useState<boolean>(
  //   window.innerWidth < 1000
  // );

  // useEffect(() => {
  //   const handleResize = () => {
  //     setSmallScreen(window.innerWidth < 1000);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  return (
    <main className="main-logged">
      <Sidebar />
      <div className="main-dashboard">
        <NavbarUser />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};
