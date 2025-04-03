import "./Layout.css";

import { Outlet } from "react-router-dom";

import { Footer, Navbar } from "../index";

export const Layout = () => {
  return (
    <main className="main-normal">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
