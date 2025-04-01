import { useEffect } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Layout } from "./components";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UnderCons } from "./components/common/fallback/UnderCons";
import { useGetSessionUserQuery } from "./features/api/authApi";
import { loginUser } from "./features/authSlice";
import { AddBet, Bets, Dashboard, Homepage, Login, Register } from "./pages";
import { FinishRegister } from "./pages/login-register/FinishRegister";
import { useAppDispatch } from "./store/hooks";

// import { Verify } from "./pages/login-register/verify-account/Verify";

// import { useAppSelector } from "./store/hooks";
// import { RootState } from "./store/store";

function App() {
  const { data, isSuccess, isError, error } = useGetSessionUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data?.success && data?.data) {
      dispatch(loginUser(data.data));
    }
  }, [isSuccess, data, dispatch]);

  console.log("App - isError:", isError, "error:", error, "data:", data);

  console.log("isError", isError);
  console.log("error", error);
  console.log("data", data);

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
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
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
