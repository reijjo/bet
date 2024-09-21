import { Outlet } from "react-router-dom";
import {
  Footer,
  NavbarUser,
  Sidebar,
  Modal,
  AddBetModal,
  TestModal,
} from "../index";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const UserLayout = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  console.log("modalState", modalState);

  return (
    <main className="main-logged">
      {modalState.modalOpen && (
        <Modal>
          {modalState.addBetModal && <AddBetModal />}
          {modalState.testModal && <TestModal />}
        </Modal>
      )}
      <Sidebar />
      <div className="main-dashboard">
        <NavbarUser />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};
