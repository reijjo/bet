import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../index";

export const Layout = () => {
  return (
    <main className="main-normal">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
