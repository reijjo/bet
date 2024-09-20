import { Outlet } from "react-router-dom";
import { Footer, NavbarUser, Sidebar, Modal } from "../index";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const UserLayout = () => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);

  return (
    <main className="main-logged">
      {modalOpen && <Modal />}
      <Sidebar />
      <div className="main-dashboard">
        <NavbarUser />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};
