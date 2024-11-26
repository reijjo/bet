import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../index";
import './Layout.css'

export const Layout = () => {
  return (
    <main className="main-normal">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
