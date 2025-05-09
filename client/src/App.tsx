import { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { Routing } from "./components/Routes";
import { SessionManager } from "./components/SessionManager";
import { ModalConfirm } from "./components/modals/confirm/ModalConfirm";
import { useAuthSession } from "./hooks/useAuthSession";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";

function App() {
  const { isRefreshModalOpen } = useAppSelector(
    (state: RootState) => state.modal,
  );
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const {
    isRefreshing,
    isLoading,
    verifySession,
    handleLogout,
    handleRefresh,
  } = useAuthSession();

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      {isAuthenticated && <SessionManager />}

      {isRefreshModalOpen && isAuthenticated && (
        <ModalConfirm
          header="Are you still there?"
          text="Do you want to stay logged in?"
          cancelButton={isLoading ? "..." : "Logout"}
          theButton="Yes!"
          handleCancel={handleLogout}
          handleConfirm={handleRefresh}
          showTimer
          disabled={isRefreshing || isLoading}
        />
      )}
      <Routing />
    </Router>
  );
}

export default App;
