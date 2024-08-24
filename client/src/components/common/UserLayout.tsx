import { Outlet } from "react-router-dom";
import { Footer, NavbarUser, Sidebar } from "../index";

export const UserLayout = () => {
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
