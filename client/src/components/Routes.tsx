import { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { Loading } from "./shared/fallback/loading/Loading";
import { UnderCons } from "./common/fallback/UnderCons";
import { AppLayout } from "./shared/index";

const RegisterPage = lazy(() => import("../pages/register/RegisterPage"));
const LoginPage = lazy(() => import("../pages/login/LoginPage"));
const FinishRegister = lazy(
  () => import("../pages/register/FinishRegisterPage")
);
const AddBet = lazy(() => import("../pages/add-bet/AddBet"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Bets = lazy(() => import("../pages/bets/Bets"));
const VerifyPage = lazy(() => import("../pages/verify-account/VerifyPage"));
const TermsPage = lazy(() => import("../pages/gibberish/TermsPage"));
const PrivacyPage = lazy(() => import("../pages/gibberish/PrivacyPage"));
const FeedbackPage = lazy(() => import("../pages/gibberish/FeedbackPage"));
const FaqPage = lazy(() => import("../pages/gibberish/FaqPage"));
const SupportPage = lazy(() => import("../pages/gibberish/SupportPage"));
const ForgotPwPage = lazy(
  () => import("../pages/forgot-password/ForgotPwPage")
);
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
        <Route path="/register/:token" element={<VerifyPage />} />
        <Route path="/forgot" element={<ForgotPwPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bank" element={<UnderCons />} />
        <Route path="/analytics" element={<UnderCons />} />
        <Route path="/about" element={<UnderCons />} />
        <Route path="/gibberish/terms" element={<TermsPage />} />
        <Route path="/gibberish/privacy" element={<PrivacyPage />} />
        <Route path="/gibberish/feedback" element={<FeedbackPage />} />
        <Route path="/gibberish/faq" element={<FaqPage />} />
        <Route path="/gibberish/support" element={<SupportPage />} />
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
