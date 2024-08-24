import { Outlet } from "react-router-dom";
import { Footer, NavbarUser, Sidebar } from "../index";
// import { useEffect, useState } from "react";

type UserLayoutProps = {
  open: boolean;
  handleSidebar: () => void;
};

export const UserLayout = ({ open, handleSidebar }: UserLayoutProps) => {
  return (
    <main className="main-logged">
      <Sidebar open={open} handleSidebar={handleSidebar} />
      <div className="main-dashboard">
        <NavbarUser open={open} handleSidebar={handleSidebar} />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};
