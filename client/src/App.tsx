// import { useEffect } from "react";
import { useEffect } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { SessionManager } from "./components/SessionManager";
import { UnderCons } from "./components/common/fallback/UnderCons";
import { AppLayout } from "./components/layout/AppLayout";
import { ModalConfirm } from "./components/modals/confirm/ModalConfirm";
import {
  useLazyGetSessionUserQuery,
  useLogoutMutation,
} from "./features/api/authApi";
import { loginUser, logoutUser } from "./features/authSlice";
import { resetModal } from "./features/modalSlice";
import { AddBet, Bets, Dashboard, Homepage, Login, Register } from "./pages";
import { FinishRegister } from "./pages/login-register/FinishRegister";
import { useAppSelector } from "./store/hooks";
import { useAppDispatch } from "./store/hooks";
import { RootState } from "./store/store";

// import { verifySession } from "./utils/helperFunctions";

// import { Verify } from "./pages/login-register/verify-account/Verify";

function App() {
  const { isRefreshModalOpen } = useAppSelector(
    (state: RootState) => state.modal,
  );
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [fetchSession] = useLazyGetSessionUserQuery();
  const [logout, { isLoading }] = useLogoutMutation();

  // const verifySession = async () => {
  //   try {
  //     const result = await fetchSession().unwrap();
  //     if (result?.success && result?.data) {
  //       dispatch(loginUser(result.data));
  //     } else {
  //       dispatch(logoutUser());
  //     }
  //   } catch (err) {
  //     console.error("Session check error:", err);
  //     dispatch(logoutUser());
  //   }
  // }

  useEffect(() => {
    // verifySession(fetchSession, dispatch);
    const verifySession = async () => {
      try {
        const result = await fetchSession().unwrap();
        if (result?.success && result?.data) {
          dispatch(loginUser(result.data));
        } else {
          dispatch(logoutUser());
        }
      } catch (err) {
        console.error("Session check error:", err);
        dispatch(logoutUser());
      }
    };
    verifySession();
  }, [dispatch, fetchSession]);

  const handleRefresh = async () => {
    // verifySession(fetchSession, dispatch);
    // const verifySession = async () => {
    try {
      const result = await fetchSession().unwrap();
      if (result?.success && result?.data) {
        dispatch(loginUser(result.data));
      } else {
        dispatch(resetModal());
        dispatch(logoutUser());
      }
    } catch (err) {
      console.error("Session check error:", err);
      dispatch(logoutUser());
    }
    // }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(resetModal());
      dispatch(logoutUser());
    }
  };

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
        />
      )}
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/finish" element={<FinishRegister />} />
          {/* <Route path="/register/:token" element={<Verify />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/bank" element={<UnderCons />} />
          <Route path="/analytics" element={<UnderCons />} />
          <Route path="/about" element={<UnderCons />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/add-bet" element={<AddBet />} />
        </Route>
        <Route path="*" element={<UnderCons />} />
      </Routes>
    </Router>
  );
}

export default App;
