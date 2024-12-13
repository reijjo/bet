import "./Layout.css";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { RootState } from "../../store/store";
import {
  Footer,
  Modal,
  ModifyBetModal,
  NavbarUser,
  Sidebar, // AddBetModal,
  TestModal,
} from "../index";

export const UserLayout = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const sidebarState = useSelector((state: RootState) => state.sidebar);

  // console.log("modalState", modalState);
  // console.log("sidebarstate", sidebarState);

  return (
    <main className="main-logged">
      {modalState.modalOpen && (
        <Modal>
          {/* {modalState.addBetModal && <AddBetModal />} */}
          {modalState.testModal && <TestModal />}
          {modalState.modifyBetModal && <ModifyBetModal />}
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
