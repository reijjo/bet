import "./Layout.css";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { RootState } from "../../store/store";
import { Footer, Modal, ModifyBetModal, NavbarUser, Sidebar } from "../index";

export const UserLayout = () => {
  const { isModifyBetModalOpen } = useSelector(
    (state: RootState) => state.modal,
  );
  const sidebarState = useSelector((state: RootState) => state.sidebar);

  return (
    <main className="main-logged">
      {isModifyBetModalOpen.isOpen && (
        <Modal>
          <ModifyBetModal />
        </Modal>
      )}

      <Sidebar />
      <div className="main-dashboard">
        {sidebarState.sidebar && <Modal />}
        <NavbarUser />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};
