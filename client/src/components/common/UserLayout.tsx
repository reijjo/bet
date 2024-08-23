import { Outlet } from "react-router-dom";
import { Footer, NavbarUser } from "../index";

export const UserLayout = () => {
  return (
    <main className="main-logged">
      <NavbarUser />
      <Outlet />
      <Footer />
    </main>
  );
};
