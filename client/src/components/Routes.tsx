import { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { Loading } from "./shared/fallback/loading/Loading";
import { UnderCons } from "./common/fallback/UnderCons";
import { AppLayout } from "./shared/index";

const RegisterPage = lazy(() => import("../pages/register/RegisterPage"));
const Login = lazy(() => import("../pages/login-register/Login"));
const FinishRegister = lazy(
  () => import("../pages/register/FinishRegisterPage")
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
const Faq = lazy(() => import("../pages/gibberish/Faq"));
const Support = lazy(() => import("../pages/gibberish/Support"));
const Forgot = lazy(() => import("../pages/login-register/forgot/Forgot"));
const HomePage = lazy(() => import("../pages/homepage/HomePage"));

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
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/finish" element={<FinishRegister />} />
        <Route path="/register/:token" element={<Verify />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bank" element={<UnderCons />} />
        <Route path="/analytics" element={<UnderCons />} />
        <Route path="/about" element={<UnderCons />} />
        <Route path="/gibberish/terms" element={<Terms />} />
        <Route path="/gibberish/privacy" element={<Privacy />} />
        <Route path="/gibberish/feedback" element={<Feedback />} />
        <Route path="/gibberish/faq" element={<Faq />} />
        <Route path="/gibberish/support" element={<Support />} />
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
