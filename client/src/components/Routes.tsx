import { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { Loading } from "./common/fallback/Loading";
import { UnderCons } from "./common/fallback/UnderCons";
import { AppLayout } from "./layout/AppLayout";

const Homepage = lazy(() => import("../pages/homepage/Homepage"));
const Register = lazy(() => import("../pages/login-register/Register"));
const Login = lazy(() => import("../pages/login-register/Login"));
const FinishRegister = lazy(
  () => import("../pages/login-register/FinishRegister")
);
const AddBet = lazy(() => import("../pages/add-bet/AddBet"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Bets = lazy(() => import("../pages/bets/Bets"));
const Verify = lazy(
  () => import("../pages/login-register/verify-account/Verify")
);
const Terms = lazy(() => import("../pages/gibberish/Terms"));
const Privacy = lazy(() => import("../pages/gibberish/Privacy"));
const Feedback = lazy(() => import("../pages/gibberish/Feedback"));

const LoadingWrapper = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Loading text="Loading page..." />
  </div>
);

export const Routing = () => (
  <Suspense fallback={<LoadingWrapper />}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/finish" element={<FinishRegister />} />
        <Route path="/register/:token" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bank" element={<UnderCons />} />
        <Route path="/analytics" element={<UnderCons />} />
        <Route path="/about" element={<UnderCons />} />
        <Route path="/gibberish/terms" element={<Terms />} />
        <Route path="/gibberish/privacy" element={<Privacy />} />
        <Route path="/gibberish/feedback" element={<Feedback />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/bets" element={<Bets />} />
        <Route path="/add-bet" element={<AddBet />} />
      </Route>
      <Route path="*" element={<UnderCons />} />
    </Routes>
  </Suspense>
);
