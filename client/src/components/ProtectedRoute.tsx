import { Navigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { UserLayout } from "./layout/UserLayout";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const rootstate = useAppSelector((state: RootState) => state);
  console.log("ProtectedRoute rootstate", rootstate);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <UserLayout />;
};
