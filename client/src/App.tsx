import { useEffect } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { UnderCons } from "./components/common/fallback/UnderCons";
import { AppLayout } from "./components/layout/AppLayout";
import { useGetSessionUserQuery } from "./features/api/authApi";
import { loginUser, logoutUser } from "./features/authSlice";
import { AddBet, Bets, Dashboard, Homepage, Login, Register } from "./pages";
import { FinishRegister } from "./pages/login-register/FinishRegister";
import { useAppDispatch } from "./store/hooks";

// import { Verify } from "./pages/login-register/verify-account/Verify";

function App() {
  const { data, isSuccess, isError, error } = useGetSessionUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data?.success && data?.data) {
      dispatch(loginUser(data.data));
    } else {
      dispatch(logoutUser());
    }

    if (isError && error && "status" in error && error.status !== 401) {
      console.error("Unexpected error:", error);
    }
  }, [isSuccess, data, dispatch, error, isError]);

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
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
